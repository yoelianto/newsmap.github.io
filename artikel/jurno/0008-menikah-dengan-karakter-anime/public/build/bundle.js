
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Header.svelte generated by Svelte v3.46.4 */

    const file$7 = "src\\Header.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (26:0) {:else}
    function create_else_block(ctx) {
    	let section;
    	let div4;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let aside;
    	let div2;
    	let t4;
    	let strong;
    	let t5;
    	let t6;
    	let div3;
    	let t7;
    	let t8;
    	let if_block = /*subhead*/ ctx[2] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*subtitle*/ ctx[1]);
    			t3 = space();
    			aside = element("aside");
    			div2 = element("div");
    			t4 = text("Oleh ");
    			strong = element("strong");
    			t5 = text(/*author*/ ctx[3]);
    			t6 = space();
    			div3 = element("div");
    			t7 = text(/*date*/ ctx[4]);
    			t8 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "title svelte-1dojxpm");
    			add_location(div0, file$7, 29, 12, 915);
    			attr_dev(div1, "class", "subtitle svelte-1dojxpm");
    			add_location(div1, file$7, 30, 12, 963);
    			add_location(strong, file$7, 32, 41, 1082);
    			attr_dev(div2, "class", "author");
    			add_location(div2, file$7, 32, 16, 1057);
    			attr_dev(div3, "class", "tanggal");
    			add_location(div3, file$7, 33, 16, 1133);
    			attr_dev(aside, "class", "credit svelte-1dojxpm");
    			add_location(aside, file$7, 31, 12, 1017);
    			attr_dev(div4, "class", "title-section svelte-1dojxpm");
    			add_location(div4, file$7, 28, 8, 874);
    			add_location(section, file$7, 26, 4, 853);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div4);
    			append_dev(div4, div0);
    			append_dev(div0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, t2);
    			append_dev(div4, t3);
    			append_dev(div4, aside);
    			append_dev(aside, div2);
    			append_dev(div2, t4);
    			append_dev(div2, strong);
    			append_dev(strong, t5);
    			append_dev(aside, t6);
    			append_dev(aside, div3);
    			append_dev(div3, t7);
    			append_dev(div4, t8);
    			if (if_block) if_block.m(div4, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*subtitle*/ 2) set_data_dev(t2, /*subtitle*/ ctx[1]);
    			if (dirty & /*author*/ 8) set_data_dev(t5, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t7, /*date*/ ctx[4]);

    			if (/*subhead*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div4, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(26:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if fullHeader}
    function create_if_block$4(ctx) {
    	let section;
    	let div6;
    	let div4;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let t4;
    	let aside;
    	let div2;
    	let t5;
    	let strong;
    	let t6;
    	let t7;
    	let div3;
    	let t8;
    	let t9;
    	let div5;
    	let each_value = /*subhead*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div6 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*subtitle*/ ctx[1]);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			aside = element("aside");
    			div2 = element("div");
    			t5 = text("Oleh ");
    			strong = element("strong");
    			t6 = text(/*author*/ ctx[3]);
    			t7 = space();
    			div3 = element("div");
    			t8 = text(/*date*/ ctx[4]);
    			t9 = space();
    			div5 = element("div");
    			attr_dev(div0, "class", "title svelte-1dojxpm");
    			add_location(div0, file$7, 9, 16, 243);
    			attr_dev(div1, "class", "subtitle svelte-1dojxpm");
    			add_location(div1, file$7, 10, 16, 295);
    			add_location(strong, file$7, 18, 45, 628);
    			attr_dev(div2, "class", "author");
    			add_location(div2, file$7, 18, 20, 603);
    			attr_dev(div3, "class", "tanggal");
    			add_location(div3, file$7, 19, 20, 683);
    			attr_dev(aside, "class", "credit svelte-1dojxpm");
    			add_location(aside, file$7, 17, 16, 559);
    			attr_dev(div4, "class", "title-section svelte-1dojxpm");
    			add_location(div4, file$7, 8, 12, 198);
    			attr_dev(div5, "class", "gradient svelte-1dojxpm");
    			add_location(div5, file$7, 22, 12, 778);
    			attr_dev(div6, "class", "full-header-img svelte-1dojxpm");
    			add_location(div6, file$7, 7, 8, 155);
    			add_location(section, file$7, 6, 4, 136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div6);
    			append_dev(div6, div4);
    			append_dev(div4, div0);
    			append_dev(div0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, t2);
    			append_dev(div4, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div4, null);
    			}

    			append_dev(div4, t4);
    			append_dev(div4, aside);
    			append_dev(aside, div2);
    			append_dev(div2, t5);
    			append_dev(div2, strong);
    			append_dev(strong, t6);
    			append_dev(aside, t7);
    			append_dev(aside, div3);
    			append_dev(div3, t8);
    			append_dev(div6, t9);
    			append_dev(div6, div5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*subtitle*/ 2) set_data_dev(t2, /*subtitle*/ ctx[1]);

    			if (dirty & /*subhead*/ 4) {
    				each_value = /*subhead*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div4, t4);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*author*/ 8) set_data_dev(t6, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t8, /*date*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(6:0) {#if fullHeader}",
    		ctx
    	});

    	return block;
    }

    // (36:12) {#if subhead}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*subhead*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subhead*/ 4) {
    				each_value_1 = /*subhead*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(36:12) {#if subhead}",
    		ctx
    	});

    	return block;
    }

    // (37:12) {#each subhead as sub}
    function create_each_block_1(ctx) {
    	let div;
    	let raw_value = /*sub*/ ctx[6] + "";

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "subhead svelte-1dojxpm");
    			add_location(div, file$7, 37, 20, 1275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			div.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subhead*/ 4 && raw_value !== (raw_value = /*sub*/ ctx[6] + "")) div.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(37:12) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    // (12:16) {#each subhead as sub}
    function create_each_block$4(ctx) {
    	let div;
    	let p;
    	let raw_value = /*sub*/ ctx[6] + "";
    	let t;
    	let br;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = space();
    			br = element("br");
    			add_location(p, file$7, 13, 24, 444);
    			attr_dev(div, "class", "subhead svelte-1dojxpm");
    			add_location(div, file$7, 12, 20, 397);
    			add_location(br, file$7, 15, 20, 512);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			p.innerHTML = raw_value;
    			insert_dev(target, t, anchor);
    			insert_dev(target, br, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subhead*/ 4 && raw_value !== (raw_value = /*sub*/ ctx[6] + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(12:16) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*fullHeader*/ ctx[5]) return create_if_block$4;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { title, subtitle, subhead, author, date } = $$props;
    	let { fullHeader = true } = $$props;
    	const writable_props = ['title', 'subtitle', 'subhead', 'author', 'date', 'fullHeader'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(1, subtitle = $$props.subtitle);
    		if ('subhead' in $$props) $$invalidate(2, subhead = $$props.subhead);
    		if ('author' in $$props) $$invalidate(3, author = $$props.author);
    		if ('date' in $$props) $$invalidate(4, date = $$props.date);
    		if ('fullHeader' in $$props) $$invalidate(5, fullHeader = $$props.fullHeader);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		subtitle,
    		subhead,
    		author,
    		date,
    		fullHeader
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(1, subtitle = $$props.subtitle);
    		if ('subhead' in $$props) $$invalidate(2, subhead = $$props.subhead);
    		if ('author' in $$props) $$invalidate(3, author = $$props.author);
    		if ('date' in $$props) $$invalidate(4, date = $$props.date);
    		if ('fullHeader' in $$props) $$invalidate(5, fullHeader = $$props.fullHeader);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, subtitle, subhead, author, date, fullHeader];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			title: 0,
    			subtitle: 1,
    			subhead: 2,
    			author: 3,
    			date: 4,
    			fullHeader: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Header> was created without expected prop 'title'");
    		}

    		if (/*subtitle*/ ctx[1] === undefined && !('subtitle' in props)) {
    			console.warn("<Header> was created without expected prop 'subtitle'");
    		}

    		if (/*subhead*/ ctx[2] === undefined && !('subhead' in props)) {
    			console.warn("<Header> was created without expected prop 'subhead'");
    		}

    		if (/*author*/ ctx[3] === undefined && !('author' in props)) {
    			console.warn("<Header> was created without expected prop 'author'");
    		}

    		if (/*date*/ ctx[4] === undefined && !('date' in props)) {
    			console.warn("<Header> was created without expected prop 'date'");
    		}
    	}

    	get title() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtitle() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtitle(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subhead() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subhead(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get author() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set author(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullHeader() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullHeader(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Paragraph.svelte generated by Svelte v3.46.4 */

    const file$6 = "src\\Paragraph.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (7:4) {#if subjudul}
    function create_if_block$3(ctx) {
    	let h3;
    	let t;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(/*subjudul*/ ctx[0]);
    			attr_dev(h3, "class", "svelte-1a9gfj3");
    			add_location(h3, file$6, 7, 8, 115);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subjudul*/ 1) set_data_dev(t, /*subjudul*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(7:4) {#if subjudul}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#each para as p}
    function create_each_block$3(ctx) {
    	let p;
    	let raw_value = /*p*/ ctx[2] + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "svelte-1a9gfj3");
    			add_location(p, file$6, 10, 8, 180);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*para*/ 2 && raw_value !== (raw_value = /*p*/ ctx[2] + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(10:4) {#each para as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section;
    	let t;
    	let if_block = /*subjudul*/ ctx[0] && create_if_block$3(ctx);
    	let each_value = /*para*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (if_block) if_block.c();
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-1a9gfj3");
    			add_location(section, file$6, 5, 0, 76);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			if (if_block) if_block.m(section, null);
    			append_dev(section, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*subjudul*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(section, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*para*/ 2) {
    				each_value = /*para*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Paragraph', slots, []);
    	let { subjudul } = $$props;
    	let { para = [] } = $$props;
    	const writable_props = ['subjudul', 'para'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paragraph> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('subjudul' in $$props) $$invalidate(0, subjudul = $$props.subjudul);
    		if ('para' in $$props) $$invalidate(1, para = $$props.para);
    	};

    	$$self.$capture_state = () => ({ subjudul, para });

    	$$self.$inject_state = $$props => {
    		if ('subjudul' in $$props) $$invalidate(0, subjudul = $$props.subjudul);
    		if ('para' in $$props) $$invalidate(1, para = $$props.para);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [subjudul, para];
    }

    class Paragraph extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { subjudul: 0, para: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*subjudul*/ ctx[0] === undefined && !('subjudul' in props)) {
    			console.warn("<Paragraph> was created without expected prop 'subjudul'");
    		}
    	}

    	get subjudul() {
    		throw new Error("<Paragraph>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subjudul(value) {
    		throw new Error("<Paragraph>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get para() {
    		throw new Error("<Paragraph>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set para(value) {
    		throw new Error("<Paragraph>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\List.svelte generated by Svelte v3.46.4 */

    const file$5 = "src\\List.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (7:4) {#if subjudul}
    function create_if_block$2(ctx) {
    	let h3;
    	let t;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(/*subjudul*/ ctx[0]);
    			attr_dev(h3, "class", "svelte-diiz9i");
    			add_location(h3, file$5, 7, 8, 115);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subjudul*/ 1) set_data_dev(t, /*subjudul*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(7:4) {#if subjudul}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#each list as item, i}
    function create_each_block$2(ctx) {
    	let div;
    	let span0;
    	let t0_value = /*i*/ ctx[4] + 1 + "";
    	let t0;
    	let t1;
    	let span1;
    	let raw_value = /*item*/ ctx[2] + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = space();
    			attr_dev(span0, "class", "number svelte-diiz9i");
    			add_location(span0, file$5, 11, 12, 223);
    			attr_dev(span1, "class", "svelte-diiz9i");
    			add_location(span1, file$5, 12, 12, 270);
    			attr_dev(div, "class", "container svelte-diiz9i");
    			add_location(div, file$5, 10, 8, 186);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			span1.innerHTML = raw_value;
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 2 && raw_value !== (raw_value = /*item*/ ctx[2] + "")) span1.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(10:4) {#each list as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let section;
    	let t;
    	let if_block = /*subjudul*/ ctx[0] && create_if_block$2(ctx);
    	let each_value = /*list*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (if_block) if_block.c();
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-diiz9i");
    			add_location(section, file$5, 5, 0, 76);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			if (if_block) if_block.m(section, null);
    			append_dev(section, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*subjudul*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(section, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*list*/ 2) {
    				each_value = /*list*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, []);
    	let { subjudul } = $$props;
    	let { list = [] } = $$props;
    	const writable_props = ['subjudul', 'list'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<List> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('subjudul' in $$props) $$invalidate(0, subjudul = $$props.subjudul);
    		if ('list' in $$props) $$invalidate(1, list = $$props.list);
    	};

    	$$self.$capture_state = () => ({ subjudul, list });

    	$$self.$inject_state = $$props => {
    		if ('subjudul' in $$props) $$invalidate(0, subjudul = $$props.subjudul);
    		if ('list' in $$props) $$invalidate(1, list = $$props.list);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [subjudul, list];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { subjudul: 0, list: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*subjudul*/ ctx[0] === undefined && !('subjudul' in props)) {
    			console.warn("<List> was created without expected prop 'subjudul'");
    		}
    	}

    	get subjudul() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subjudul(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get list() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set list(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Quote.svelte generated by Svelte v3.46.4 */

    const file$4 = "src\\Quote.svelte";

    function create_fragment$4(ctx) {
    	let section;
    	let figure;
    	let div1;
    	let div0;
    	let t0;
    	let img;
    	let img_src_value;
    	let t1;
    	let div5;
    	let div2;
    	let t2;
    	let div3;
    	let p;
    	let t3;
    	let t4;
    	let div4;
    	let span;
    	let t5;
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			section = element("section");
    			figure = element("figure");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			div5 = element("div");
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			p = element("p");
    			t3 = text(/*quotes*/ ctx[2]);
    			t4 = space();
    			div4 = element("div");
    			span = element("span");
    			t5 = text(/*person*/ ctx[3]);
    			t6 = text(", ");
    			t7 = text(/*credential*/ ctx[4]);
    			attr_dev(div0, "class", "pic-bg svelte-1o0bngr");
    			add_location(div0, file$4, 7, 12, 153);
    			attr_dev(img, "class", "quote-img svelte-1o0bngr");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*imgalt*/ ctx[1]);
    			add_location(img, file$4, 8, 12, 193);
    			attr_dev(div1, "class", "quote-pic svelte-1o0bngr");
    			add_location(div1, file$4, 6, 8, 116);
    			attr_dev(div2, "class", "quotes-tri svelte-1o0bngr");
    			add_location(div2, file$4, 12, 12, 322);
    			attr_dev(p, "class", "svelte-1o0bngr");
    			add_location(p, file$4, 14, 16, 404);
    			attr_dev(div3, "class", "quotes svelte-1o0bngr");
    			add_location(div3, file$4, 13, 12, 366);
    			attr_dev(span, "class", "quotes-bold svelte-1o0bngr");
    			add_location(span, file$4, 17, 16, 497);
    			attr_dev(div4, "class", "quote-name svelte-1o0bngr");
    			add_location(div4, file$4, 16, 12, 455);
    			attr_dev(div5, "class", "quotes-right svelte-1o0bngr");
    			add_location(div5, file$4, 11, 8, 282);
    			attr_dev(figure, "class", "svelte-1o0bngr");
    			add_location(figure, file$4, 5, 4, 98);
    			attr_dev(section, "class", "svelte-1o0bngr");
    			add_location(section, file$4, 4, 0, 83);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, figure);
    			append_dev(figure, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img);
    			append_dev(figure, t1);
    			append_dev(figure, div5);
    			append_dev(div5, div2);
    			append_dev(div5, t2);
    			append_dev(div5, div3);
    			append_dev(div3, p);
    			append_dev(p, t3);
    			append_dev(div5, t4);
    			append_dev(div5, div4);
    			append_dev(div4, span);
    			append_dev(span, t5);
    			append_dev(div4, t6);
    			append_dev(div4, t7);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imgurl*/ 1 && !src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*imgalt*/ 2) {
    				attr_dev(img, "alt", /*imgalt*/ ctx[1]);
    			}

    			if (dirty & /*quotes*/ 4) set_data_dev(t3, /*quotes*/ ctx[2]);
    			if (dirty & /*person*/ 8) set_data_dev(t5, /*person*/ ctx[3]);
    			if (dirty & /*credential*/ 16) set_data_dev(t7, /*credential*/ ctx[4]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Quote', slots, []);
    	let { imgurl, imgalt, quotes, person, credential } = $$props;
    	const writable_props = ['imgurl', 'imgalt', 'quotes', 'person', 'credential'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Quote> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('imgurl' in $$props) $$invalidate(0, imgurl = $$props.imgurl);
    		if ('imgalt' in $$props) $$invalidate(1, imgalt = $$props.imgalt);
    		if ('quotes' in $$props) $$invalidate(2, quotes = $$props.quotes);
    		if ('person' in $$props) $$invalidate(3, person = $$props.person);
    		if ('credential' in $$props) $$invalidate(4, credential = $$props.credential);
    	};

    	$$self.$capture_state = () => ({
    		imgurl,
    		imgalt,
    		quotes,
    		person,
    		credential
    	});

    	$$self.$inject_state = $$props => {
    		if ('imgurl' in $$props) $$invalidate(0, imgurl = $$props.imgurl);
    		if ('imgalt' in $$props) $$invalidate(1, imgalt = $$props.imgalt);
    		if ('quotes' in $$props) $$invalidate(2, quotes = $$props.quotes);
    		if ('person' in $$props) $$invalidate(3, person = $$props.person);
    		if ('credential' in $$props) $$invalidate(4, credential = $$props.credential);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imgurl, imgalt, quotes, person, credential];
    }

    class Quote extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			imgurl: 0,
    			imgalt: 1,
    			quotes: 2,
    			person: 3,
    			credential: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quote",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imgurl*/ ctx[0] === undefined && !('imgurl' in props)) {
    			console.warn("<Quote> was created without expected prop 'imgurl'");
    		}

    		if (/*imgalt*/ ctx[1] === undefined && !('imgalt' in props)) {
    			console.warn("<Quote> was created without expected prop 'imgalt'");
    		}

    		if (/*quotes*/ ctx[2] === undefined && !('quotes' in props)) {
    			console.warn("<Quote> was created without expected prop 'quotes'");
    		}

    		if (/*person*/ ctx[3] === undefined && !('person' in props)) {
    			console.warn("<Quote> was created without expected prop 'person'");
    		}

    		if (/*credential*/ ctx[4] === undefined && !('credential' in props)) {
    			console.warn("<Quote> was created without expected prop 'credential'");
    		}
    	}

    	get imgurl() {
    		throw new Error("<Quote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgurl(value) {
    		throw new Error("<Quote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imgalt() {
    		throw new Error("<Quote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgalt(value) {
    		throw new Error("<Quote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get quotes() {
    		throw new Error("<Quote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set quotes(value) {
    		throw new Error("<Quote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get person() {
    		throw new Error("<Quote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set person(value) {
    		throw new Error("<Quote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get credential() {
    		throw new Error("<Quote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set credential(value) {
    		throw new Error("<Quote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Image.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file$3 = "src\\Image.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (20:2) {#each img as image}
    function create_each_block$1(ctx) {
    	let img_1;
    	let img_1_src_value;
    	let img_1_alt_value;

    	const block = {
    		c: function create() {
    			img_1 = element("img");
    			if (!src_url_equal(img_1.src, img_1_src_value = /*image*/ ctx[4].url)) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", img_1_alt_value = /*image*/ ctx[4].title);
    			set_style(img_1, "width", 98 / /*len*/ ctx[3] + "%");
    			attr_dev(img_1, "class", "svelte-125p5jy");
    			add_location(img_1, file$3, 20, 3, 322);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*img*/ 1 && !src_url_equal(img_1.src, img_1_src_value = /*image*/ ctx[4].url)) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}

    			if (dirty & /*img*/ 1 && img_1_alt_value !== (img_1_alt_value = /*image*/ ctx[4].title)) {
    				attr_dev(img_1, "alt", img_1_alt_value);
    			}

    			if (dirty & /*len*/ 8) {
    				set_style(img_1, "width", 98 / /*len*/ ctx[3] + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(20:2) {#each img as image}",
    		ctx
    	});

    	return block;
    }

    // (24:1) {#if imageTitle && imageSource}
    function create_if_block$1(ctx) {
    	let aside;
    	let div;
    	let t0;
    	let br;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			div = element("div");
    			t0 = text(/*imageTitle*/ ctx[1]);
    			br = element("br");
    			t1 = text("Sumber foto: ");
    			t2 = text(/*imageSource*/ ctx[2]);
    			add_location(br, file$3, 25, 42, 506);
    			attr_dev(div, "class", "source svelte-125p5jy");
    			add_location(div, file$3, 25, 8, 472);
    			add_location(aside, file$3, 24, 4, 455);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			append_dev(aside, div);
    			append_dev(div, t0);
    			append_dev(div, br);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*imageTitle*/ 2) set_data_dev(t0, /*imageTitle*/ ctx[1]);
    			if (dirty & /*imageSource*/ 4) set_data_dev(t2, /*imageSource*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(24:1) {#if imageTitle && imageSource}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let figure;
    	let div;
    	let t;
    	let each_value = /*img*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let if_block = /*imageTitle*/ ctx[1] && /*imageSource*/ ctx[2] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "container");
    			add_location(div, file$3, 18, 4, 270);
    			attr_dev(figure, "class", "svelte-125p5jy");
    			add_location(figure, file$3, 17, 0, 256);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(figure, t);
    			if (if_block) if_block.m(figure, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*img, len*/ 9) {
    				each_value = /*img*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*imageTitle*/ ctx[1] && /*imageSource*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(figure, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Image', slots, []);
    	let { img = [{ url: '', title: '' }] } = $$props;
    	let { imageTitle, imageSource } = $$props;
    	let len;

    	onMount(() => {
    		$$invalidate(3, len = img.length);
    		console.log(img, len);
    	});

    	const writable_props = ['img', 'imageTitle', 'imageSource'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('imageTitle' in $$props) $$invalidate(1, imageTitle = $$props.imageTitle);
    		if ('imageSource' in $$props) $$invalidate(2, imageSource = $$props.imageSource);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		img,
    		imageTitle,
    		imageSource,
    		len
    	});

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('imageTitle' in $$props) $$invalidate(1, imageTitle = $$props.imageTitle);
    		if ('imageSource' in $$props) $$invalidate(2, imageSource = $$props.imageSource);
    		if ('len' in $$props) $$invalidate(3, len = $$props.len);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [img, imageTitle, imageSource, len];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { img: 0, imageTitle: 1, imageSource: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imageTitle*/ ctx[1] === undefined && !('imageTitle' in props)) {
    			console_1.warn("<Image> was created without expected prop 'imageTitle'");
    		}

    		if (/*imageSource*/ ctx[2] === undefined && !('imageSource' in props)) {
    			console_1.warn("<Image> was created without expected prop 'imageSource'");
    		}
    	}

    	get img() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imageTitle() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imageTitle(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imageSource() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imageSource(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Credit.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\Credit.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (10:4) {#each credit as person}
    function create_each_block(ctx) {
    	let div4;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div3;
    	let div1;
    	let t1_value = /*person*/ ctx[2].role + "";
    	let t1;
    	let t2;
    	let div2;
    	let t3_value = /*person*/ ctx[2].name + "";
    	let t3;
    	let t4;
    	let div5;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div5 = element("div");
    			if (!src_url_equal(img.src, img_src_value = "./images/" + /*person*/ ctx[2].name + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*person*/ ctx[2].name);
    			attr_dev(img, "class", "svelte-1vai98i");
    			add_location(img, file$2, 12, 16, 246);
    			attr_dev(div0, "class", "profpic svelte-1vai98i");
    			add_location(div0, file$2, 11, 12, 207);
    			attr_dev(div1, "class", "role svelte-1vai98i");
    			add_location(div1, file$2, 15, 16, 376);
    			attr_dev(div2, "class", "name svelte-1vai98i");
    			add_location(div2, file$2, 16, 16, 433);
    			attr_dev(div3, "class", "profname svelte-1vai98i");
    			add_location(div3, file$2, 14, 12, 336);
    			attr_dev(div4, "class", "profile svelte-1vai98i");
    			attr_dev(div4, "id", "p1");
    			add_location(div4, file$2, 10, 8, 164);
    			attr_dev(div5, "class", "profile-bar svelte-1vai98i");
    			add_location(div5, file$2, 19, 8, 517);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*credit*/ 1 && !src_url_equal(img.src, img_src_value = "./images/" + /*person*/ ctx[2].name + ".png")) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*credit*/ 1 && img_alt_value !== (img_alt_value = /*person*/ ctx[2].name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*credit*/ 1 && t1_value !== (t1_value = /*person*/ ctx[2].role + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*credit*/ 1 && t3_value !== (t3_value = /*person*/ ctx[2].name + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:4) {#each credit as person}",
    		ctx
    	});

    	return block;
    }

    // (24:4) {#if source}
    function create_if_block(ctx) {
    	let t0;
    	let t1;
    	let br;

    	const block = {
    		c: function create() {
    			t0 = text("Sumber: ");
    			t1 = text(/*source*/ ctx[1]);
    			br = element("br");
    			add_location(br, file$2, 24, 22, 620);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*source*/ 2) set_data_dev(t1, /*source*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(24:4) {#if source}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let div;
    	let t0;
    	let t1;
    	let br;
    	let t2;
    	let each_value = /*credit*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	let if_block = /*source*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			t0 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			br = element("br");
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "section-bar svelte-1vai98i");
    			add_location(div, file$2, 8, 4, 93);
    			add_location(br, file$2, 22, 4, 574);
    			attr_dev(section, "class", "svelte-1vai98i");
    			add_location(section, file$2, 7, 0, 78);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(section, t0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}

    			append_dev(section, t1);
    			append_dev(section, br);
    			append_dev(section, t2);
    			if (if_block) if_block.m(section, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*credit*/ 1) {
    				each_value = /*credit*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*source*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(section, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Credit', slots, []);
    	let { credit = [] } = $$props;
    	let { source } = $$props;
    	const writable_props = ['credit', 'source'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Credit> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('credit' in $$props) $$invalidate(0, credit = $$props.credit);
    		if ('source' in $$props) $$invalidate(1, source = $$props.source);
    	};

    	$$self.$capture_state = () => ({ credit, source });

    	$$self.$inject_state = $$props => {
    		if ('credit' in $$props) $$invalidate(0, credit = $$props.credit);
    		if ('source' in $$props) $$invalidate(1, source = $$props.source);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [credit, source];
    }

    class Credit extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { credit: 0, source: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Credit",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*source*/ ctx[1] === undefined && !('source' in props)) {
    			console.warn("<Credit> was created without expected prop 'source'");
    		}
    	}

    	get credit() {
    		throw new Error("<Credit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set credit(value) {
    		throw new Error("<Credit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get source() {
    		throw new Error("<Credit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set source(value) {
    		throw new Error("<Credit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\@sveltejs\svelte-scroller\Scroller.svelte generated by Svelte v3.46.4 */

    const { window: window_1 } = globals;
    const file$1 = "node_modules\\@sveltejs\\svelte-scroller\\Scroller.svelte";
    const get_foreground_slot_changes = dirty => ({});
    const get_foreground_slot_context = ctx => ({});
    const get_background_slot_changes = dirty => ({});
    const get_background_slot_context = ctx => ({});

    function create_fragment$1(ctx) {
    	let svelte_scroller_outer;
    	let svelte_scroller_background_container;
    	let svelte_scroller_background;
    	let svelte_scroller_background_container_style_value;
    	let t;
    	let svelte_scroller_foreground;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[21]);
    	const background_slot_template = /*#slots*/ ctx[20].background;
    	const background_slot = create_slot(background_slot_template, ctx, /*$$scope*/ ctx[19], get_background_slot_context);
    	const foreground_slot_template = /*#slots*/ ctx[20].foreground;
    	const foreground_slot = create_slot(foreground_slot_template, ctx, /*$$scope*/ ctx[19], get_foreground_slot_context);

    	const block = {
    		c: function create() {
    			svelte_scroller_outer = element("svelte-scroller-outer");
    			svelte_scroller_background_container = element("svelte-scroller-background-container");
    			svelte_scroller_background = element("svelte-scroller-background");
    			if (background_slot) background_slot.c();
    			t = space();
    			svelte_scroller_foreground = element("svelte-scroller-foreground");
    			if (foreground_slot) foreground_slot.c();
    			set_custom_element_data(svelte_scroller_background, "class", "svelte-xdbafy");
    			add_location(svelte_scroller_background, file$1, 173, 2, 3978);
    			set_custom_element_data(svelte_scroller_background_container, "class", "background-container svelte-xdbafy");
    			set_custom_element_data(svelte_scroller_background_container, "style", svelte_scroller_background_container_style_value = "" + (/*style*/ ctx[5] + /*widthStyle*/ ctx[4]));
    			add_location(svelte_scroller_background_container, file$1, 172, 1, 3880);
    			set_custom_element_data(svelte_scroller_foreground, "class", "svelte-xdbafy");
    			add_location(svelte_scroller_foreground, file$1, 178, 1, 4140);
    			set_custom_element_data(svelte_scroller_outer, "class", "svelte-xdbafy");
    			add_location(svelte_scroller_outer, file$1, 171, 0, 3837);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_scroller_outer, anchor);
    			append_dev(svelte_scroller_outer, svelte_scroller_background_container);
    			append_dev(svelte_scroller_background_container, svelte_scroller_background);

    			if (background_slot) {
    				background_slot.m(svelte_scroller_background, null);
    			}

    			/*svelte_scroller_background_binding*/ ctx[22](svelte_scroller_background);
    			append_dev(svelte_scroller_outer, t);
    			append_dev(svelte_scroller_outer, svelte_scroller_foreground);

    			if (foreground_slot) {
    				foreground_slot.m(svelte_scroller_foreground, null);
    			}

    			/*svelte_scroller_foreground_binding*/ ctx[23](svelte_scroller_foreground);
    			/*svelte_scroller_outer_binding*/ ctx[24](svelte_scroller_outer);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window_1, "resize", /*onwindowresize*/ ctx[21]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (background_slot) {
    				if (background_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						background_slot,
    						background_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(background_slot_template, /*$$scope*/ ctx[19], dirty, get_background_slot_changes),
    						get_background_slot_context
    					);
    				}
    			}

    			if (!current || dirty[0] & /*style, widthStyle*/ 48 && svelte_scroller_background_container_style_value !== (svelte_scroller_background_container_style_value = "" + (/*style*/ ctx[5] + /*widthStyle*/ ctx[4]))) {
    				set_custom_element_data(svelte_scroller_background_container, "style", svelte_scroller_background_container_style_value);
    			}

    			if (foreground_slot) {
    				if (foreground_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						foreground_slot,
    						foreground_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(foreground_slot_template, /*$$scope*/ ctx[19], dirty, get_foreground_slot_changes),
    						get_foreground_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(background_slot, local);
    			transition_in(foreground_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(background_slot, local);
    			transition_out(foreground_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_scroller_outer);
    			if (background_slot) background_slot.d(detaching);
    			/*svelte_scroller_background_binding*/ ctx[22](null);
    			if (foreground_slot) foreground_slot.d(detaching);
    			/*svelte_scroller_foreground_binding*/ ctx[23](null);
    			/*svelte_scroller_outer_binding*/ ctx[24](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const handlers = [];
    let manager;

    if (typeof window !== 'undefined') {
    	const run_all = () => handlers.forEach(fn => fn());
    	window.addEventListener('scroll', run_all);
    	window.addEventListener('resize', run_all);
    }

    if (typeof IntersectionObserver !== 'undefined') {
    	const map = new Map();

    	const observer = new IntersectionObserver((entries, observer) => {
    			entries.forEach(entry => {
    				const update = map.get(entry.target);
    				const index = handlers.indexOf(update);

    				if (entry.isIntersecting) {
    					if (index === -1) handlers.push(update);
    				} else {
    					update();
    					if (index !== -1) handlers.splice(index, 1);
    				}
    			});
    		},
    	{
    			rootMargin: '400px 0px', // TODO why 400?
    			
    		});

    	manager = {
    		add: ({ outer, update }) => {
    			const { top, bottom } = outer.getBoundingClientRect();
    			if (top < window.innerHeight && bottom > 0) handlers.push(update);
    			map.set(outer, update);
    			observer.observe(outer);
    		},
    		remove: ({ outer, update }) => {
    			const index = handlers.indexOf(update);
    			if (index !== -1) handlers.splice(index, 1);
    			map.delete(outer);
    			observer.unobserve(outer);
    		}
    	};
    } else {
    	manager = {
    		add: ({ update }) => {
    			handlers.push(update);
    		},
    		remove: ({ update }) => {
    			const index = handlers.indexOf(update);
    			if (index !== -1) handlers.splice(index, 1);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let top_px;
    	let bottom_px;
    	let threshold_px;
    	let style;
    	let widthStyle;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scroller', slots, ['background','foreground']);
    	let { top = 0 } = $$props;
    	let { bottom = 1 } = $$props;
    	let { threshold = 0.5 } = $$props;
    	let { query = 'section' } = $$props;
    	let { parallax = false } = $$props;
    	let { index = 0 } = $$props;
    	let { count = 0 } = $$props;
    	let { offset = 0 } = $$props;
    	let { progress = 0 } = $$props;
    	let { visible = false } = $$props;
    	let outer;
    	let foreground;
    	let background;
    	let left;
    	let sections;
    	let wh = 0;
    	let fixed;
    	let offset_top = 0;
    	let width = 1;
    	let height;
    	let inverted;

    	onMount(() => {
    		sections = foreground.querySelectorAll(query);
    		$$invalidate(7, count = sections.length);
    		update();
    		const scroller = { outer, update };
    		manager.add(scroller);
    		return () => manager.remove(scroller);
    	});

    	function update() {
    		if (!foreground) return;

    		// re-measure outer container
    		const bcr = outer.getBoundingClientRect();

    		left = bcr.left;
    		$$invalidate(18, width = bcr.right - left);

    		// determine fix state
    		const fg = foreground.getBoundingClientRect();

    		const bg = background.getBoundingClientRect();
    		$$invalidate(10, visible = fg.top < wh && fg.bottom > 0);
    		const foreground_height = fg.bottom - fg.top;
    		const background_height = bg.bottom - bg.top;
    		const available_space = bottom_px - top_px;
    		$$invalidate(9, progress = (top_px - fg.top) / (foreground_height - available_space));

    		if (progress <= 0) {
    			$$invalidate(17, offset_top = 0);
    			$$invalidate(16, fixed = false);
    		} else if (progress >= 1) {
    			$$invalidate(17, offset_top = parallax
    			? foreground_height - background_height
    			: foreground_height - available_space);

    			$$invalidate(16, fixed = false);
    		} else {
    			$$invalidate(17, offset_top = parallax
    			? Math.round(top_px - progress * (background_height - available_space))
    			: top_px);

    			$$invalidate(16, fixed = true);
    		}

    		for (let i = 0; i < sections.length; i++) {
    			const section = sections[i];
    			const { top } = section.getBoundingClientRect();
    			const next = sections[i + 1];
    			const bottom = next ? next.getBoundingClientRect().top : fg.bottom;
    			$$invalidate(8, offset = (threshold_px - top) / (bottom - top));

    			if (bottom >= threshold_px) {
    				$$invalidate(6, index = i);
    				break;
    			}
    		}
    	}

    	const writable_props = [
    		'top',
    		'bottom',
    		'threshold',
    		'query',
    		'parallax',
    		'index',
    		'count',
    		'offset',
    		'progress',
    		'visible'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scroller> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(0, wh = window_1.innerHeight);
    	}

    	function svelte_scroller_background_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			background = $$value;
    			$$invalidate(3, background);
    		});
    	}

    	function svelte_scroller_foreground_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			foreground = $$value;
    			$$invalidate(2, foreground);
    		});
    	}

    	function svelte_scroller_outer_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			outer = $$value;
    			$$invalidate(1, outer);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('top' in $$props) $$invalidate(11, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(12, bottom = $$props.bottom);
    		if ('threshold' in $$props) $$invalidate(13, threshold = $$props.threshold);
    		if ('query' in $$props) $$invalidate(14, query = $$props.query);
    		if ('parallax' in $$props) $$invalidate(15, parallax = $$props.parallax);
    		if ('index' in $$props) $$invalidate(6, index = $$props.index);
    		if ('count' in $$props) $$invalidate(7, count = $$props.count);
    		if ('offset' in $$props) $$invalidate(8, offset = $$props.offset);
    		if ('progress' in $$props) $$invalidate(9, progress = $$props.progress);
    		if ('visible' in $$props) $$invalidate(10, visible = $$props.visible);
    		if ('$$scope' in $$props) $$invalidate(19, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		handlers,
    		manager,
    		onMount,
    		top,
    		bottom,
    		threshold,
    		query,
    		parallax,
    		index,
    		count,
    		offset,
    		progress,
    		visible,
    		outer,
    		foreground,
    		background,
    		left,
    		sections,
    		wh,
    		fixed,
    		offset_top,
    		width,
    		height,
    		inverted,
    		update,
    		threshold_px,
    		top_px,
    		bottom_px,
    		widthStyle,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ('top' in $$props) $$invalidate(11, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(12, bottom = $$props.bottom);
    		if ('threshold' in $$props) $$invalidate(13, threshold = $$props.threshold);
    		if ('query' in $$props) $$invalidate(14, query = $$props.query);
    		if ('parallax' in $$props) $$invalidate(15, parallax = $$props.parallax);
    		if ('index' in $$props) $$invalidate(6, index = $$props.index);
    		if ('count' in $$props) $$invalidate(7, count = $$props.count);
    		if ('offset' in $$props) $$invalidate(8, offset = $$props.offset);
    		if ('progress' in $$props) $$invalidate(9, progress = $$props.progress);
    		if ('visible' in $$props) $$invalidate(10, visible = $$props.visible);
    		if ('outer' in $$props) $$invalidate(1, outer = $$props.outer);
    		if ('foreground' in $$props) $$invalidate(2, foreground = $$props.foreground);
    		if ('background' in $$props) $$invalidate(3, background = $$props.background);
    		if ('left' in $$props) left = $$props.left;
    		if ('sections' in $$props) sections = $$props.sections;
    		if ('wh' in $$props) $$invalidate(0, wh = $$props.wh);
    		if ('fixed' in $$props) $$invalidate(16, fixed = $$props.fixed);
    		if ('offset_top' in $$props) $$invalidate(17, offset_top = $$props.offset_top);
    		if ('width' in $$props) $$invalidate(18, width = $$props.width);
    		if ('height' in $$props) height = $$props.height;
    		if ('inverted' in $$props) $$invalidate(31, inverted = $$props.inverted);
    		if ('threshold_px' in $$props) threshold_px = $$props.threshold_px;
    		if ('top_px' in $$props) top_px = $$props.top_px;
    		if ('bottom_px' in $$props) bottom_px = $$props.bottom_px;
    		if ('widthStyle' in $$props) $$invalidate(4, widthStyle = $$props.widthStyle);
    		if ('style' in $$props) $$invalidate(5, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*top, wh*/ 2049) {
    			top_px = Math.round(top * wh);
    		}

    		if ($$self.$$.dirty[0] & /*bottom, wh*/ 4097) {
    			bottom_px = Math.round(bottom * wh);
    		}

    		if ($$self.$$.dirty[0] & /*threshold, wh*/ 8193) {
    			threshold_px = Math.round(threshold * wh);
    		}

    		if ($$self.$$.dirty[0] & /*top, bottom, threshold, parallax*/ 47104) {
    			(update());
    		}

    		if ($$self.$$.dirty[0] & /*fixed, offset_top*/ 196608) {
    			$$invalidate(5, style = `
		position: ${fixed ? 'fixed' : 'absolute'};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${inverted ? 3 : 1};
	`);
    		}

    		if ($$self.$$.dirty[0] & /*fixed, width*/ 327680) {
    			$$invalidate(4, widthStyle = fixed ? `width:${width}px;` : '');
    		}
    	};

    	return [
    		wh,
    		outer,
    		foreground,
    		background,
    		widthStyle,
    		style,
    		index,
    		count,
    		offset,
    		progress,
    		visible,
    		top,
    		bottom,
    		threshold,
    		query,
    		parallax,
    		fixed,
    		offset_top,
    		width,
    		$$scope,
    		slots,
    		onwindowresize,
    		svelte_scroller_background_binding,
    		svelte_scroller_foreground_binding,
    		svelte_scroller_outer_binding
    	];
    }

    class Scroller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				top: 11,
    				bottom: 12,
    				threshold: 13,
    				query: 14,
    				parallax: 15,
    				index: 6,
    				count: 7,
    				offset: 8,
    				progress: 9,
    				visible: 10
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scroller",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get top() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threshold() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threshold(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get query() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get parallax() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set parallax(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get count() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set count(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get offset() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set offset(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get progress() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set progress(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get visible() {
    		throw new Error("<Scroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Scroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */

    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let meta;
    	let link0;
    	let link1;
    	let link2;
    	let t0;
    	let main;
    	let div0;
    	let t1;
    	let header;
    	let div;
    	let t2;
    	let div1;
    	let t3;
    	let image0;
    	let t4;
    	let paragraph0;
    	let div_1;
    	let t5;
    	let paragraph1;
    	let div_2;
    	let t6;
    	let image1;
    	let t7;
    	let paragraph2;
    	let div_3;
    	let t8;
    	let paragraph3;
    	let div_4;
    	let t9;
    	let image2;
    	let t10;
    	let paragraph4;
    	let div_5;
    	let t11;
    	let list;
    	let div_6;
    	let t12;
    	let paragraph5;
    	let div_7;
    	let t13;
    	let paragraph6;
    	let div_8;
    	let t14;
    	let credit_1;
    	let div_9;
    	let current;

    	header = new Header({
    			props: {
    				fullHeader: false,
    				title: "Menikah dengan Karakter Anime:",
    				subtitle: "Ketika Ide Lebih Menarik Daripada Karakter Nyata",
    				author: "Ann Putri",
    				date: "16 Mei 2022"
    			},
    			$$inline: true
    		});

    	image0 = new Image({
    			props: {
    				img: [
    					{
    						url: './images/capture_tilik.jpg',
    						title: 'Potongan adegan dari film Tilik (2018)'
    					}
    				],
    				imageTitle: "Potongan adegan dari film Tilik (2018)",
    				imageSource: "Ravacana Films"
    			},
    			$$inline: true
    		});

    	paragraph0 = new Paragraph({
    			props: {
    				para: [
    					"Potongan di atas adalah cuplikan dialog <a href='https://www.youtube.com/watch?v=GAyvgz8_zV8'>Tilik (2018)</a> besutan Wahyu Agung Prasetyo. Film yang viral pada 2020 ini tak hanya berhasil menggambarkan kehidupan kampung di Yogyakarta, tapi juga membuka banyak diskusi. Salah satunya tentang <a href='https://medium.com/binokular/menilik-tilik-dan-julidan-netizen-a623a0afa430'>stereotip perempuan dan bergosip</a>.",
    					'Di <em>Tilik</em>, gosip digambarkan sebagai suatu hal yang negatif. Benarkah?'
    				]
    			},
    			$$inline: true
    		});

    	paragraph1 = new Paragraph({
    			props: {
    				subjudul: "Menilik Asal-usul Gosip",
    				para: [
    					"Gosip sebetulnya memiliki sejarah panjang. Robin Dunbar, antropolog sekaligus psikolog evolusioner berteori bahwa gosip yang kita lakukan sekarang merupakan versi manusia dari perawatan diri para primata. Para primata saling menggaruk punggung satu sama lain sebagai cara untuk memperkuat hubungan sosial.",
    					'Primata kemudian berkembang menjadi <em>hominid</em>, lalu berkembang lagi menjadi <em>homo</em> atau manusia purba. Berbeda dengan sepupu hominid lainnya, manusia purba jauh lebih cerdas dan sosial. Kehidupan berkelompok mereka jauh lebih besar sehingga dicarilah cara lain yang lebih efisien untuk bersosialisasi. Gosip pun akhirnya menjadi pelumas dan perekat hubungan sosial paling tokcer.'
    				]
    			},
    			$$inline: true
    		});

    	image1 = new Image({
    			props: {
    				img: [
    					{
    						url: './images/asal-usul-gosip-01.png',
    						title: 'Asal-usul gosip'
    					}
    				]
    			},
    			$$inline: true
    		});

    	paragraph2 = new Paragraph({
    			props: {
    				para: [
    					"Seiring waktu, manusia membentuk kelompok yang jauh lebih besar dengan tatanan sosial yang lebih rumit pula. Gosip yang awalnya bisa mendekatkan hubungan, malah menghancurkannya. Jadilah agama melarang gosip. Kitab Talmud adalah yang pertama <a href='https://www.reviewofreligions.org/32748/world-faiths-slander-gossip-foul-speech/'>melarang membicarakan hal-hal buruk</a> soal orang lain. Ajaran ini juga disebutkan di Alkitab dan Al Qur’an.",
    					"Lalu kenapa gosip erat kaitannya dengan perempuan? Kemungkinan karena para <a href='https://wordhistories.net/2017/02/04/gossip/'>ibu-ibu abad ke-17</a> yang sedang menunggu kelahiran anaknya sering membicarakan suami, keluarga, dan tetangga mereka—ya pokoknya orang-orang yang tak ada di ruangan itu—bersama para suster dan bidan. Maklum, menunggu anak lahir butuh waktu berjam-jam sampai berhari-hari, jadi apa lagi yang bisa mereka lakukan selain <em>ghibah</em>?",
    					"Kebiasaan mereka ini akhirnya disebut sebagai “gosip”. Saking seringnya kata ini digunakan, kata “gosip” sampai digunakan di Alkitab versi Raja James, menggantikan istilah “pembisik” (<em>whisperer</em>) dan “pembawa cerita” (<em>talebearer</em>) yang umumnya memiliki konotasi negatif.",
    					"Pandangan negatif soal gosip terus eksis hingga sekarang. Pandangan negatif soal gosip paling terlihat di lingkungan kantor. Ini karena gosip, menurut orang-orang <em>Human Resources</em>, adalah <a href='https://www.syntrio.com/blog/the-negative-impact-of-gossip-in-the-workplace/'>penyebab utama</a> kondisi kantor yang tidak kondusif. Gosip dianggap memantik konflik, mengikis kepercayaan antar pegawai, menurunkan moral, serta menghambat kerja tim. Lebih pentingnya lagi, gosip kantor juga <a href='https://hbr.org/2018/10/stop-complaining-about-your-colleagues-behind-their-backs?utm_medium=social&utm_campaign=hbr&utm_source=twitter&tpcc=orgsocial_edit'>merusak usaha untuk membuat sistem komunikasi yang sehat</a>, profesional, dan terbuka di tempat kerja. Tak mengherankan kalau <a href='https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/office-gossip-policies.aspx'>ada yang menyebut</a> gosip sebagai bentuk kekerasan di tempat kerja.",
    					"Tapi, seperti layaknya gosip, kita juga perlu mempertanyakan klaim itu. Apa betul semua jenis gosip di kantor 100% berbahaya?"
    				]
    			},
    			$$inline: true
    		});

    	paragraph3 = new Paragraph({
    			props: {
    				subjudul: "Mematahkan Mitos dan Prasangka Tentang Gosip",
    				para: [
    					"Penelitian-penelitian empiris sebelumnya tentang gosip justru mematahkan mitos seputar gosip. Penelitian terbaru yang dilakukan oleh <a href='https://journals.sagepub.com/doi/abs/10.1177/1948550619837000?journalCode=sppa'>Robbins dan Karan (2020)</a> dengan responden mahasiswa S1 berbagai universitas Amerika Serikat menunjukkan sekaligus mengkonfirmasi ulang bahwa ⅔ gosip bernada netral atau bahkan positif."
    				]
    			},
    			$$inline: true
    		});

    	image2 = new Image({
    			props: {
    				img: [
    					{
    						url: './images/mitos-dan-prasangka-gosip-01.png',
    						title: 'Mitos dan Prasangka Gosip'
    					}
    				]
    			},
    			$$inline: true
    		});

    	paragraph4 = new Paragraph({
    			props: {
    				para: [
    					"Penelitian ini  juga mematahkan pandangan bahwa hanya perempuan yang bergosip, laki-laki juga begitu"
    				]
    			},
    			$$inline: true
    		});

    	list = new List({
    			props: {
    				list: [
    					"Perempuan cenderung lebih sering bergosip tapi bernada netral",
    					"Laki-laki lebih sedikit bergosip tapi nadanya lebih negatif daripada perempuan",
    					"Orang-orang ekstrovert cenderung lebih suka bergosip dibanding yang introvert",
    					"Orang-orang belajar norma sosial lewat bergosip.",
    					"Anak-anak muda lebih sering bergosip buruk dibanding orang-orang tua"
    				]
    			},
    			$$inline: true
    		});

    	paragraph5 = new Paragraph({
    			props: {
    				para: [
    					"Karena mayoritas bersifat netral, gosip menjadi sarana yang tepat untuk mengumpulkan informasi di ruang kerja. Tak hanya itu, gosip juga membuat kita bisa mengetahui apa saja yang terjadi ketika waktu dan perhatian kita disedot oleh pekerjaan. Bayangkan, Anda sedang istirahat makan siang di <em>pantry</em> sambil membicarakan kebiasaan si anu yang sering telat kirim pekerjaan di Slack. Perilaku seperti ini bukan hanya menyindir si anu, tapi juga sebagai bentuk kontrol sosial supaya orang-orang di situ tidak melakukan hal yang sama."
    				]
    			},
    			$$inline: true
    		});

    	paragraph6 = new Paragraph({
    			props: {
    				para: [
    					"Akhir kata, gosip tidak selalu buruk—selama tidak menjelek-jelekkan seseorang atau sampai menyakiti hati. Gosip juga bisa menjadi penanda bahwa ada sesuatu yang salah di suatu lingkungan. Orang-orang yang menjadi korban perundungan atau pelecehan cenderung menceritakan kejadiannya ke orang lain dengan janji anonimitas. Sayang keuntungan ini juga bisa disalahgunakan oleh orang-orang untuk merundung atau menyudutkan seseorang.",
    					"Jadi bijaklah ketika bergosip, ya."
    				]
    			},
    			$$inline: true
    		});

    	credit_1 = new Credit({
    			props: { credit: /*credit*/ ctx[8] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			meta = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			t0 = space();
    			main = element("main");
    			div0 = element("div");
    			t1 = space();
    			div = element("div");
    			create_component(header.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			create_component(image0.$$.fragment);
    			t4 = space();
    			div_1 = element("div");
    			create_component(paragraph0.$$.fragment);
    			t5 = space();
    			div_2 = element("div");
    			create_component(paragraph1.$$.fragment);
    			t6 = space();
    			create_component(image1.$$.fragment);
    			t7 = space();
    			div_3 = element("div");
    			create_component(paragraph2.$$.fragment);
    			t8 = space();
    			div_4 = element("div");
    			create_component(paragraph3.$$.fragment);
    			t9 = space();
    			create_component(image2.$$.fragment);
    			t10 = space();
    			div_5 = element("div");
    			create_component(paragraph4.$$.fragment);
    			t11 = space();
    			div_6 = element("div");
    			create_component(list.$$.fragment);
    			t12 = space();
    			div_7 = element("div");
    			create_component(paragraph5.$$.fragment);
    			t13 = space();
    			div_8 = element("div");
    			create_component(paragraph6.$$.fragment);
    			t14 = space();
    			div_9 = element("div");
    			create_component(credit_1.$$.fragment);
    			attr_dev(meta, "name", "viewport");
    			attr_dev(meta, "content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
    			add_location(meta, file, 43, 1, 901);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file, 48, 1, 1019);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			attr_dev(link1, "crossorigin", "");
    			add_location(link1, file, 49, 1, 1080);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Carter+One&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file, 50, 1, 1150);
    			attr_dev(div0, "class", "headerilustrasi");
    			set_style(div0, "margin-top", /*height*/ ctx[7] + "px");
    			add_location(div0, file, 54, 1, 1313);
    			set_style(div, "display", "contents");
    			set_style(div, "--headerBackground", /*headerBackground*/ ctx[3]);
    			set_style(div, "--titleColor", /*titleColor*/ ctx[4]);
    			set_style(div, "--subtitleColor", /*subtitleColor*/ ctx[5]);
    			set_style(div, "--subheadColor", /*subheadColor*/ ctx[6]);
    			attr_dev(div1, "class", "divider svelte-1u0oh95");
    			add_location(div1, file, 74, 1, 1708);
    			set_style(div_1, "display", "contents");
    			set_style(div_1, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_2, "display", "contents");
    			set_style(div_2, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_3, "display", "contents");
    			set_style(div_3, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_4, "display", "contents");
    			set_style(div_4, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_5, "display", "contents");
    			set_style(div_5, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_6, "display", "contents");
    			set_style(div_6, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_7, "display", "contents");
    			set_style(div_7, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_8, "display", "contents");
    			set_style(div_8, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(div_9, "display", "contents");
    			set_style(div_9, "--fontfamily1", /*fontfamily1*/ ctx[0]);
    			set_style(div_9, "--font-color", /*fontColor*/ ctx[1]);
    			set_style(main, "background-color", /*mainBackground*/ ctx[2]);
    			add_location(main, file, 53, 0, 1262);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(main, t1);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(main, t2);
    			append_dev(main, div1);
    			append_dev(main, t3);
    			mount_component(image0, main, null);
    			append_dev(main, t4);
    			append_dev(main, div_1);
    			mount_component(paragraph0, div_1, null);
    			append_dev(main, t5);
    			append_dev(main, div_2);
    			mount_component(paragraph1, div_2, null);
    			append_dev(main, t6);
    			mount_component(image1, main, null);
    			append_dev(main, t7);
    			append_dev(main, div_3);
    			mount_component(paragraph2, div_3, null);
    			append_dev(main, t8);
    			append_dev(main, div_4);
    			mount_component(paragraph3, div_4, null);
    			append_dev(main, t9);
    			mount_component(image2, main, null);
    			append_dev(main, t10);
    			append_dev(main, div_5);
    			mount_component(paragraph4, div_5, null);
    			append_dev(main, t11);
    			append_dev(main, div_6);
    			mount_component(list, div_6, null);
    			append_dev(main, t12);
    			append_dev(main, div_7);
    			mount_component(paragraph5, div_7, null);
    			append_dev(main, t13);
    			append_dev(main, div_8);
    			mount_component(paragraph6, div_8, null);
    			append_dev(main, t14);
    			append_dev(main, div_9);
    			mount_component(credit_1, div_9, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(image0.$$.fragment, local);
    			transition_in(paragraph0.$$.fragment, local);
    			transition_in(paragraph1.$$.fragment, local);
    			transition_in(image1.$$.fragment, local);
    			transition_in(paragraph2.$$.fragment, local);
    			transition_in(paragraph3.$$.fragment, local);
    			transition_in(image2.$$.fragment, local);
    			transition_in(paragraph4.$$.fragment, local);
    			transition_in(list.$$.fragment, local);
    			transition_in(paragraph5.$$.fragment, local);
    			transition_in(paragraph6.$$.fragment, local);
    			transition_in(credit_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(image0.$$.fragment, local);
    			transition_out(paragraph0.$$.fragment, local);
    			transition_out(paragraph1.$$.fragment, local);
    			transition_out(image1.$$.fragment, local);
    			transition_out(paragraph2.$$.fragment, local);
    			transition_out(paragraph3.$$.fragment, local);
    			transition_out(image2.$$.fragment, local);
    			transition_out(paragraph4.$$.fragment, local);
    			transition_out(list.$$.fragment, local);
    			transition_out(paragraph5.$$.fragment, local);
    			transition_out(paragraph6.$$.fragment, local);
    			transition_out(credit_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta);
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(image0);
    			destroy_component(paragraph0);
    			destroy_component(paragraph1);
    			destroy_component(image1);
    			destroy_component(paragraph2);
    			destroy_component(paragraph3);
    			destroy_component(image2);
    			destroy_component(paragraph4);
    			destroy_component(list);
    			destroy_component(paragraph5);
    			destroy_component(paragraph6);
    			destroy_component(credit_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let fontfamily1 = "Roboto Mono";

    	//Main Color
    	let fontColor = 'hsl(200,43%,34%)';

    	//Secondary Dark Color
    	let colorBrandDarkBlue = "#242053";

    	// scroller variables
    	let count, index, offset, progress;

    	let top = 0;
    	let threshold = 0;
    	let bottom = 1;

    	// styling variables
    	let mainBackground = 'hsl(0,0%,100%)';

    	let headerBackground = 'hsl(0,0%,100%)';
    	let titleColor = 'hsl(200,43%,34%)';
    	let subtitleColor = 'hsl(200,43%,50%)';
    	let subheadColor = 'hsl(0,0%,0%)';
    	let height;
    	let credit = [{ role: 'Penulis', name: 'Ann Putri' }];
    	let source = '';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Header,
    		Paragraph,
    		List,
    		Quote,
    		Image,
    		Credit,
    		fontfamily1,
    		fontColor,
    		colorBrandDarkBlue,
    		Scroller,
    		count,
    		index,
    		offset,
    		progress,
    		top,
    		threshold,
    		bottom,
    		mainBackground,
    		headerBackground,
    		titleColor,
    		subtitleColor,
    		subheadColor,
    		height,
    		credit,
    		source
    	});

    	$$self.$inject_state = $$props => {
    		if ('fontfamily1' in $$props) $$invalidate(0, fontfamily1 = $$props.fontfamily1);
    		if ('fontColor' in $$props) $$invalidate(1, fontColor = $$props.fontColor);
    		if ('colorBrandDarkBlue' in $$props) colorBrandDarkBlue = $$props.colorBrandDarkBlue;
    		if ('count' in $$props) count = $$props.count;
    		if ('index' in $$props) index = $$props.index;
    		if ('offset' in $$props) offset = $$props.offset;
    		if ('progress' in $$props) progress = $$props.progress;
    		if ('top' in $$props) top = $$props.top;
    		if ('threshold' in $$props) threshold = $$props.threshold;
    		if ('bottom' in $$props) bottom = $$props.bottom;
    		if ('mainBackground' in $$props) $$invalidate(2, mainBackground = $$props.mainBackground);
    		if ('headerBackground' in $$props) $$invalidate(3, headerBackground = $$props.headerBackground);
    		if ('titleColor' in $$props) $$invalidate(4, titleColor = $$props.titleColor);
    		if ('subtitleColor' in $$props) $$invalidate(5, subtitleColor = $$props.subtitleColor);
    		if ('subheadColor' in $$props) $$invalidate(6, subheadColor = $$props.subheadColor);
    		if ('height' in $$props) $$invalidate(7, height = $$props.height);
    		if ('credit' in $$props) $$invalidate(8, credit = $$props.credit);
    		if ('source' in $$props) source = $$props.source;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		fontfamily1,
    		fontColor,
    		mainBackground,
    		headerBackground,
    		titleColor,
    		subtitleColor,
    		subheadColor,
    		height,
    		credit
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
