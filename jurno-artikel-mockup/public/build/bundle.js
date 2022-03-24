
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
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
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

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
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

    const file$6 = "src\\Header.svelte";

    // (22:0) {:else}
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

    	const block = {
    		c: function create() {
    			section = element("section");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*subhead*/ ctx[2]);
    			t3 = space();
    			aside = element("aside");
    			div2 = element("div");
    			t4 = text("Oleh ");
    			strong = element("strong");
    			t5 = text(/*author*/ ctx[3]);
    			t6 = space();
    			div3 = element("div");
    			t7 = text(/*date*/ ctx[4]);
    			attr_dev(div0, "class", "title svelte-omwfho");
    			add_location(div0, file$6, 25, 12, 770);
    			attr_dev(div1, "class", "subhead svelte-omwfho");
    			add_location(div1, file$6, 27, 12, 881);
    			add_location(strong, file$6, 30, 41, 999);
    			attr_dev(div2, "class", "author");
    			add_location(div2, file$6, 30, 16, 974);
    			attr_dev(div3, "class", "tanggal");
    			add_location(div3, file$6, 31, 16, 1050);
    			attr_dev(aside, "class", "credit svelte-omwfho");
    			add_location(aside, file$6, 29, 12, 934);
    			attr_dev(div4, "class", "title-section svelte-omwfho");
    			add_location(div4, file$6, 24, 8, 729);
    			add_location(section, file$6, 22, 4, 708);
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
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*subhead*/ 4) set_data_dev(t2, /*subhead*/ ctx[2]);
    			if (dirty & /*author*/ 8) set_data_dev(t5, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t7, /*date*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(22:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if fullHeader}
    function create_if_block$1(ctx) {
    	let section;
    	let div7;
    	let div5;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let div2;
    	let t4;
    	let t5;
    	let aside;
    	let div3;
    	let t6;
    	let strong;
    	let t7;
    	let t8;
    	let div4;
    	let t9;
    	let t10;
    	let div6;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div7 = element("div");
    			div5 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*subtitle*/ ctx[1]);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(/*subhead*/ ctx[2]);
    			t5 = space();
    			aside = element("aside");
    			div3 = element("div");
    			t6 = text("Oleh ");
    			strong = element("strong");
    			t7 = text(/*author*/ ctx[3]);
    			t8 = space();
    			div4 = element("div");
    			t9 = text(/*date*/ ctx[4]);
    			t10 = space();
    			div6 = element("div");
    			attr_dev(div0, "class", "title svelte-omwfho");
    			add_location(div0, file$6, 9, 16, 243);
    			attr_dev(div1, "class", "subtitle svelte-omwfho");
    			add_location(div1, file$6, 10, 16, 295);
    			attr_dev(div2, "class", "subhead svelte-omwfho");
    			add_location(div2, file$6, 11, 16, 353);
    			add_location(strong, file$6, 14, 45, 483);
    			attr_dev(div3, "class", "author");
    			add_location(div3, file$6, 14, 20, 458);
    			attr_dev(div4, "class", "tanggal");
    			add_location(div4, file$6, 15, 20, 538);
    			attr_dev(aside, "class", "credit svelte-omwfho");
    			add_location(aside, file$6, 13, 16, 414);
    			attr_dev(div5, "class", "title-section svelte-omwfho");
    			add_location(div5, file$6, 8, 12, 198);
    			attr_dev(div6, "class", "gradient svelte-omwfho");
    			add_location(div6, file$6, 18, 12, 633);
    			attr_dev(div7, "class", "full-header-img svelte-omwfho");
    			add_location(div7, file$6, 7, 8, 155);
    			add_location(section, file$6, 6, 4, 136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div7);
    			append_dev(div7, div5);
    			append_dev(div5, div0);
    			append_dev(div0, t0);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, t2);
    			append_dev(div5, t3);
    			append_dev(div5, div2);
    			append_dev(div2, t4);
    			append_dev(div5, t5);
    			append_dev(div5, aside);
    			append_dev(aside, div3);
    			append_dev(div3, t6);
    			append_dev(div3, strong);
    			append_dev(strong, t7);
    			append_dev(aside, t8);
    			append_dev(aside, div4);
    			append_dev(div4, t9);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*subtitle*/ 2) set_data_dev(t2, /*subtitle*/ ctx[1]);
    			if (dirty & /*subhead*/ 4) set_data_dev(t4, /*subhead*/ ctx[2]);
    			if (dirty & /*author*/ 8) set_data_dev(t7, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t9, /*date*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(6:0) {#if fullHeader}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*fullHeader*/ ctx[5]) return create_if_block$1;
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
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
    			id: create_fragment$6.name
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

    const file$5 = "src\\Paragraph.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each para as p}
    function create_each_block$1(ctx) {
    	let p;
    	let t_value = /*p*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-1y35es1");
    			add_location(p, file$5, 8, 8, 157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*para*/ 1 && t_value !== (t_value = /*p*/ ctx[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(8:4) {#each para as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let section;
    	let each_value = /*para*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-1y35es1");
    			add_location(section, file$5, 5, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*para*/ 1) {
    				each_value = /*para*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    	validate_slots('Paragraph', slots, []);
    	let { para = [] } = $$props;
    	const writable_props = ['para'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paragraph> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('para' in $$props) $$invalidate(0, para = $$props.para);
    	};

    	$$self.$capture_state = () => ({ para });

    	$$self.$inject_state = $$props => {
    		if ('para' in $$props) $$invalidate(0, para = $$props.para);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [para];
    }

    class Paragraph extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { para: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get para() {
    		throw new Error("<Paragraph>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set para(value) {
    		throw new Error("<Paragraph>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    const file$3 = "src\\Image.svelte";

    function create_fragment$3(ctx) {
    	let figure;
    	let div25;
    	let div4;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div1;
    	let p0;
    	let span0;
    	let t3;
    	let t4;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let div2;
    	let p3;
    	let t10;
    	let p4;
    	let t12;
    	let div3;
    	let p5;
    	let t14;
    	let p6;
    	let t16;
    	let div9;
    	let div5;
    	let t17;
    	let img1;
    	let img1_src_value;
    	let t18;
    	let div6;
    	let p7;
    	let span1;
    	let t20;
    	let t21;
    	let p8;
    	let t23;
    	let p9;
    	let t25;
    	let div7;
    	let p10;
    	let t27;
    	let p11;
    	let t29;
    	let div8;
    	let p12;
    	let t31;
    	let p13;
    	let t33;
    	let div14;
    	let div10;
    	let t34;
    	let img2;
    	let img2_src_value;
    	let t35;
    	let div11;
    	let p14;
    	let span2;
    	let t37;
    	let t38;
    	let p15;
    	let t40;
    	let p16;
    	let t42;
    	let div12;
    	let p17;
    	let t44;
    	let p18;
    	let t46;
    	let div13;
    	let p19;
    	let t48;
    	let p20;
    	let t50;
    	let div19;
    	let div15;
    	let t51;
    	let img3;
    	let img3_src_value;
    	let t52;
    	let div16;
    	let p21;
    	let span3;
    	let t54;
    	let t55;
    	let p22;
    	let t57;
    	let p23;
    	let t59;
    	let div17;
    	let p24;
    	let t61;
    	let p25;
    	let t63;
    	let div18;
    	let p26;
    	let t65;
    	let p27;
    	let t67;
    	let div24;
    	let div20;
    	let t68;
    	let img4;
    	let img4_src_value;
    	let t69;
    	let div21;
    	let p28;
    	let t70;
    	let span4;
    	let t72;
    	let t73;
    	let p29;
    	let t75;
    	let div22;
    	let p30;
    	let t77;
    	let p31;
    	let t79;
    	let div23;
    	let p32;
    	let t81;
    	let p33;
    	let t83;
    	let aside;
    	let div26;
    	let t84;
    	let br;
    	let t85;
    	let t86;

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			div25 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div1 = element("div");
    			p0 = element("p");
    			span0 = element("span");
    			span0.textContent = "EFEK ";
    			t3 = text("HALLYU");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "PADA PDB";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "KOREA SELATAN";
    			t8 = space();
    			div2 = element("div");
    			p3 = element("p");
    			p3.textContent = "$ 1,87 Miliar";
    			t10 = space();
    			p4 = element("p");
    			p4.textContent = "2004";
    			t12 = space();
    			div3 = element("div");
    			p5 = element("p");
    			p5.textContent = "$ 12,3 Miliar";
    			t14 = space();
    			p6 = element("p");
    			p6.textContent = "2019";
    			t16 = space();
    			div9 = element("div");
    			div5 = element("div");
    			t17 = space();
    			img1 = element("img");
    			t18 = space();
    			div6 = element("div");
    			p7 = element("p");
    			span1 = element("span");
    			span1.textContent = "EFEK ";
    			t20 = text("HALLYU");
    			t21 = space();
    			p8 = element("p");
    			p8.textContent = "PADA PDB";
    			t23 = space();
    			p9 = element("p");
    			p9.textContent = "KOREA SELATAN";
    			t25 = space();
    			div7 = element("div");
    			p10 = element("p");
    			p10.textContent = "$ 1,87 Miliar";
    			t27 = space();
    			p11 = element("p");
    			p11.textContent = "2004";
    			t29 = space();
    			div8 = element("div");
    			p12 = element("p");
    			p12.textContent = "$ 12,3 Miliar";
    			t31 = space();
    			p13 = element("p");
    			p13.textContent = "2019";
    			t33 = space();
    			div14 = element("div");
    			div10 = element("div");
    			t34 = space();
    			img2 = element("img");
    			t35 = space();
    			div11 = element("div");
    			p14 = element("p");
    			span2 = element("span");
    			span2.textContent = "EFEK ";
    			t37 = text("HALLYU");
    			t38 = space();
    			p15 = element("p");
    			p15.textContent = "PADA PDB";
    			t40 = space();
    			p16 = element("p");
    			p16.textContent = "KOREA SELATAN";
    			t42 = space();
    			div12 = element("div");
    			p17 = element("p");
    			p17.textContent = "$ 1,87 Miliar";
    			t44 = space();
    			p18 = element("p");
    			p18.textContent = "2004";
    			t46 = space();
    			div13 = element("div");
    			p19 = element("p");
    			p19.textContent = "$ 12,3 Miliar";
    			t48 = space();
    			p20 = element("p");
    			p20.textContent = "2019";
    			t50 = space();
    			div19 = element("div");
    			div15 = element("div");
    			t51 = space();
    			img3 = element("img");
    			t52 = space();
    			div16 = element("div");
    			p21 = element("p");
    			span3 = element("span");
    			span3.textContent = "EFEK ";
    			t54 = text("HALLYU");
    			t55 = space();
    			p22 = element("p");
    			p22.textContent = "PADA PDB";
    			t57 = space();
    			p23 = element("p");
    			p23.textContent = "KOREA SELATAN";
    			t59 = space();
    			div17 = element("div");
    			p24 = element("p");
    			p24.textContent = "$ 1,87 Miliar";
    			t61 = space();
    			p25 = element("p");
    			p25.textContent = "2004";
    			t63 = space();
    			div18 = element("div");
    			p26 = element("p");
    			p26.textContent = "$ 12,3 Miliar";
    			t65 = space();
    			p27 = element("p");
    			p27.textContent = "2019";
    			t67 = space();
    			div24 = element("div");
    			div20 = element("div");
    			t68 = space();
    			img4 = element("img");
    			t69 = space();
    			div21 = element("div");
    			p28 = element("p");
    			t70 = text("EFEK ");
    			span4 = element("span");
    			span4.textContent = "HALLYU ";
    			t72 = text("PADA PDB");
    			t73 = space();
    			p29 = element("p");
    			p29.textContent = "KOREA SELATAN";
    			t75 = space();
    			div22 = element("div");
    			p30 = element("p");
    			p30.textContent = "$ 1,87 Miliar";
    			t77 = space();
    			p31 = element("p");
    			p31.textContent = "2004";
    			t79 = space();
    			div23 = element("div");
    			p32 = element("p");
    			p32.textContent = "$ 12,3 Miliar";
    			t81 = space();
    			p33 = element("p");
    			p33.textContent = "2019";
    			t83 = space();
    			aside = element("aside");
    			div26 = element("div");
    			t84 = text(/*imageTitle*/ ctx[0]);
    			br = element("br");
    			t85 = text("Sumber foto: ");
    			t86 = text(/*imageSource*/ ctx[1]);
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file$3, 15, 2, 437);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-data-img");
    			attr_dev(img0, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-data.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$3, 16, 4, 486);
    			attr_dev(span0, "class", "g-cstyle0");
    			add_location(span0, file$3, 18, 26, 782);
    			attr_dev(p0, "class", "g-pstyle0");
    			add_location(p0, file$3, 18, 5, 761);
    			attr_dev(p1, "class", "g-pstyle1");
    			add_location(p1, file$3, 19, 5, 835);
    			attr_dev(p2, "class", "g-pstyle0");
    			add_location(p2, file$3, 20, 5, 875);
    			attr_dev(div1, "id", "g-ai25-1");
    			attr_dev(div1, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div1, "top", "34.0296%");
    			set_style(div1, "margin-top", "-57.2px");
    			set_style(div1, "left", "49.2184%");
    			set_style(div1, "margin-left", "-148.5px");
    			set_style(div1, "width", "297px");
    			add_location(div1, file$3, 17, 4, 607);
    			attr_dev(p3, "class", "g-pstyle2");
    			add_location(p3, file$3, 23, 5, 1061);
    			attr_dev(p4, "class", "g-pstyle2");
    			add_location(p4, file$3, 24, 5, 1106);
    			attr_dev(div2, "id", "g-ai25-2");
    			attr_dev(div2, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div2, "top", "51.464%");
    			set_style(div2, "margin-top", "-14.2px");
    			set_style(div2, "left", "4.6825%");
    			set_style(div2, "width", "99px");
    			add_location(div2, file$3, 22, 4, 931);
    			attr_dev(p5, "class", "g-pstyle3");
    			add_location(p5, file$3, 27, 5, 1284);
    			attr_dev(p6, "class", "g-pstyle3");
    			add_location(p6, file$3, 28, 5, 1329);
    			attr_dev(div3, "id", "g-ai25-3");
    			attr_dev(div3, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div3, "top", "51.464%");
    			set_style(div3, "margin-top", "-14.2px");
    			set_style(div3, "right", "4.0607%");
    			set_style(div3, "width", "99px");
    			add_location(div3, file$3, 26, 4, 1153);
    			attr_dev(div4, "id", "g-Korean-Waves-smallplus-data");
    			attr_dev(div4, "class", "g-artboard");
    			set_style(div4, "max-width", "509px");
    			set_style(div4, "max-height", "1113px");
    			attr_dev(div4, "data-aspect-ratio", "0.457");
    			attr_dev(div4, "data-min-width", "0");
    			attr_dev(div4, "data-max-width", "509");
    			add_location(div4, file$3, 14, 1, 264);
    			set_style(div5, "padding", "0 0 156.8627% 0");
    			add_location(div5, file$3, 34, 2, 1620);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-data-img");
    			attr_dev(img1, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-data.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$3, 35, 4, 1671);
    			attr_dev(span1, "class", "g-cstyle0");
    			add_location(span1, file$3, 37, 26, 1967);
    			attr_dev(p7, "class", "g-pstyle0");
    			add_location(p7, file$3, 37, 5, 1946);
    			attr_dev(p8, "class", "g-pstyle1");
    			add_location(p8, file$3, 38, 5, 2020);
    			attr_dev(p9, "class", "g-pstyle0");
    			add_location(p9, file$3, 39, 5, 2060);
    			attr_dev(div6, "id", "g-ai26-1");
    			attr_dev(div6, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div6, "top", "26.7684%");
    			set_style(div6, "margin-top", "-75.1px");
    			set_style(div6, "left", "50.0015%");
    			set_style(div6, "margin-left", "-191.5px");
    			set_style(div6, "width", "383px");
    			add_location(div6, file$3, 36, 4, 1792);
    			attr_dev(p10, "class", "g-pstyle2");
    			add_location(p10, file$3, 42, 5, 2248);
    			attr_dev(p11, "class", "g-pstyle2");
    			add_location(p11, file$3, 43, 5, 2293);
    			attr_dev(div7, "id", "g-ai26-2");
    			attr_dev(div7, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div7, "top", "50.2573%");
    			set_style(div7, "margin-top", "-23.1px");
    			set_style(div7, "left", "3.7282%");
    			set_style(div7, "width", "147px");
    			add_location(div7, file$3, 41, 4, 2116);
    			attr_dev(p12, "class", "g-pstyle3");
    			add_location(p12, file$3, 46, 5, 2473);
    			attr_dev(p13, "class", "g-pstyle3");
    			add_location(p13, file$3, 47, 5, 2518);
    			attr_dev(div8, "id", "g-ai26-3");
    			attr_dev(div8, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div8, "top", "50.2573%");
    			set_style(div8, "margin-top", "-23.1px");
    			set_style(div8, "right", "3.1528%");
    			set_style(div8, "width", "147px");
    			add_location(div8, file$3, 45, 4, 2340);
    			attr_dev(div9, "id", "g-Korean-Waves-submedium-data");
    			attr_dev(div9, "class", "g-artboard");
    			set_style(div9, "min-width", "510px");
    			set_style(div9, "max-width", "689px");
    			set_style(div9, "max-height", "1081px");
    			attr_dev(div9, "data-aspect-ratio", "0.638");
    			attr_dev(div9, "data-min-width", "510");
    			attr_dev(div9, "data-max-width", "689");
    			add_location(div9, file$3, 33, 3, 1428);
    			set_style(div10, "padding", "0 0 148.4058% 0");
    			add_location(div10, file$3, 53, 2, 2803);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-data-img");
    			attr_dev(img2, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-data.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$3, 54, 4, 2854);
    			attr_dev(span2, "class", "g-cstyle0");
    			add_location(span2, file$3, 56, 26, 3143);
    			attr_dev(p14, "class", "g-pstyle0");
    			add_location(p14, file$3, 56, 5, 3122);
    			attr_dev(p15, "class", "g-pstyle1");
    			add_location(p15, file$3, 57, 5, 3196);
    			attr_dev(p16, "class", "g-pstyle0");
    			add_location(p16, file$3, 58, 5, 3236);
    			attr_dev(div11, "id", "g-ai27-1");
    			attr_dev(div11, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div11, "top", "27.0156%");
    			set_style(div11, "margin-top", "-107.6px");
    			set_style(div11, "left", "50.0224%");
    			set_style(div11, "margin-left", "-269px");
    			set_style(div11, "width", "538px");
    			add_location(div11, file$3, 55, 4, 2969);
    			attr_dev(p17, "class", "g-pstyle2");
    			add_location(p17, file$3, 61, 5, 3424);
    			attr_dev(p18, "class", "g-pstyle2");
    			add_location(p18, file$3, 62, 5, 3469);
    			attr_dev(div12, "id", "g-ai27-2");
    			attr_dev(div12, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div12, "top", "49.5576%");
    			set_style(div12, "margin-top", "-31.5px");
    			set_style(div12, "left", "4.0423%");
    			set_style(div12, "width", "190px");
    			add_location(div12, file$3, 60, 4, 3292);
    			attr_dev(p19, "class", "g-pstyle3");
    			add_location(p19, file$3, 65, 5, 3649);
    			attr_dev(p20, "class", "g-pstyle3");
    			add_location(p20, file$3, 66, 5, 3694);
    			attr_dev(div13, "id", "g-ai27-3");
    			attr_dev(div13, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div13, "top", "49.5576%");
    			set_style(div13, "margin-top", "-31.5px");
    			set_style(div13, "right", "3.4664%");
    			set_style(div13, "width", "190px");
    			add_location(div13, file$3, 64, 4, 3516);
    			attr_dev(div14, "id", "g-Korean-Waves-medium-data");
    			attr_dev(div14, "class", "g-artboard");
    			set_style(div14, "min-width", "690px");
    			set_style(div14, "max-width", "919px");
    			set_style(div14, "max-height", "1364px");
    			attr_dev(div14, "data-aspect-ratio", "0.674");
    			attr_dev(div14, "data-min-width", "690");
    			attr_dev(div14, "data-max-width", "919");
    			add_location(div14, file$3, 52, 3, 2614);
    			set_style(div15, "padding", "0 0 100% 0");
    			add_location(div15, file$3, 72, 2, 3975);
    			attr_dev(img3, "id", "g-Korean-Waves-large-data-img");
    			attr_dev(img3, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-data.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$3, 73, 4, 4021);
    			attr_dev(span3, "class", "g-cstyle0");
    			add_location(span3, file$3, 75, 26, 4305);
    			attr_dev(p21, "class", "g-pstyle0");
    			add_location(p21, file$3, 75, 5, 4284);
    			attr_dev(p22, "class", "g-pstyle1");
    			add_location(p22, file$3, 76, 5, 4358);
    			attr_dev(p23, "class", "g-pstyle0");
    			add_location(p23, file$3, 77, 5, 4398);
    			attr_dev(div16, "id", "g-ai28-1");
    			attr_dev(div16, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div16, "top", "19.2%");
    			set_style(div16, "margin-top", "-107.6px");
    			set_style(div16, "left", "50.0168%");
    			set_style(div16, "margin-left", "-269px");
    			set_style(div16, "width", "538px");
    			add_location(div16, file$3, 74, 4, 4134);
    			attr_dev(p24, "class", "g-pstyle2");
    			add_location(p24, file$3, 80, 5, 4586);
    			attr_dev(p25, "class", "g-pstyle2");
    			add_location(p25, file$3, 81, 5, 4631);
    			attr_dev(div17, "id", "g-ai28-2");
    			attr_dev(div17, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div17, "top", "41.7867%");
    			set_style(div17, "margin-top", "-42.4px");
    			set_style(div17, "left", "3.6724%");
    			set_style(div17, "width", "248px");
    			add_location(div17, file$3, 79, 4, 4454);
    			attr_dev(p26, "class", "g-pstyle3");
    			add_location(p26, file$3, 84, 5, 4811);
    			attr_dev(p27, "class", "g-pstyle3");
    			add_location(p27, file$3, 85, 5, 4856);
    			attr_dev(div18, "id", "g-ai28-3");
    			attr_dev(div18, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div18, "top", "41.7867%");
    			set_style(div18, "margin-top", "-42.4px");
    			set_style(div18, "right", "3.0703%");
    			set_style(div18, "width", "248px");
    			add_location(div18, file$3, 83, 4, 4678);
    			attr_dev(div19, "id", "g-Korean-Waves-large-data");
    			attr_dev(div19, "class", "g-artboard");
    			set_style(div19, "min-width", "920px");
    			set_style(div19, "max-width", "1399px");
    			set_style(div19, "max-height", "1399px");
    			attr_dev(div19, "data-aspect-ratio", "1");
    			attr_dev(div19, "data-min-width", "920");
    			attr_dev(div19, "data-max-width", "1399");
    			add_location(div19, file$3, 71, 3, 3789);
    			set_style(div20, "padding", "0 0 56.25% 0");
    			add_location(div20, file$3, 91, 2, 5087);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-data-img");
    			attr_dev(img4, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-data.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$3, 92, 4, 5135);
    			attr_dev(span4, "class", "g-cstyle0");
    			add_location(span4, file$3, 94, 31, 5430);
    			attr_dev(p28, "class", "g-pstyle0");
    			add_location(p28, file$3, 94, 5, 5404);
    			attr_dev(p29, "class", "g-pstyle1");
    			add_location(p29, file$3, 95, 5, 5487);
    			attr_dev(div21, "id", "g-ai29-1");
    			attr_dev(div21, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div21, "top", "12.6527%");
    			set_style(div21, "margin-top", "-71.6px");
    			set_style(div21, "left", "49.9925%");
    			set_style(div21, "margin-left", "-388.5px");
    			set_style(div21, "width", "777px");
    			add_location(div21, file$3, 93, 4, 5250);
    			attr_dev(p30, "class", "g-pstyle2");
    			add_location(p30, file$3, 98, 5, 5676);
    			attr_dev(p31, "class", "g-pstyle2");
    			add_location(p31, file$3, 99, 5, 5721);
    			attr_dev(div22, "id", "g-ai29-2");
    			attr_dev(div22, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div22, "top", "33.1737%");
    			set_style(div22, "margin-top", "-45.2px");
    			set_style(div22, "left", "17.3621%");
    			set_style(div22, "width", "265px");
    			add_location(div22, file$3, 97, 4, 5543);
    			attr_dev(p32, "class", "g-pstyle3");
    			add_location(p32, file$3, 102, 5, 5902);
    			attr_dev(p33, "class", "g-pstyle3");
    			add_location(p33, file$3, 103, 5, 5947);
    			attr_dev(div23, "id", "g-ai29-3");
    			attr_dev(div23, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div23, "top", "33.1737%");
    			set_style(div23, "margin-top", "-45.2px");
    			set_style(div23, "right", "16.8871%");
    			set_style(div23, "width", "265px");
    			add_location(div23, file$3, 101, 4, 5768);
    			attr_dev(div24, "id", "g-Korean-Waves-xlarge-data");
    			attr_dev(div24, "class", "g-artboard");
    			set_style(div24, "min-width", "1400px");
    			attr_dev(div24, "data-aspect-ratio", "1.778");
    			attr_dev(div24, "data-min-width", "1400");
    			add_location(div24, file$3, 90, 3, 4952);
    			attr_dev(div25, "id", "g-Korean-Waves-box");
    			attr_dev(div25, "class", "ai2html");
    			add_location(div25, file$3, 12, 4, 179);
    			add_location(br, file$3, 114, 42, 6244);
    			attr_dev(div26, "class", "source svelte-125p5jy");
    			add_location(div26, file$3, 114, 8, 6210);
    			add_location(aside, file$3, 113, 4, 6193);
    			attr_dev(figure, "class", "svelte-125p5jy");
    			add_location(figure, file$3, 10, 0, 163);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, div25);
    			append_dev(div25, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, img0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, p0);
    			append_dev(p0, span0);
    			append_dev(p0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			append_dev(div1, t6);
    			append_dev(div1, p2);
    			append_dev(div4, t8);
    			append_dev(div4, div2);
    			append_dev(div2, p3);
    			append_dev(div2, t10);
    			append_dev(div2, p4);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			append_dev(div3, p5);
    			append_dev(div3, t14);
    			append_dev(div3, p6);
    			append_dev(div25, t16);
    			append_dev(div25, div9);
    			append_dev(div9, div5);
    			append_dev(div9, t17);
    			append_dev(div9, img1);
    			append_dev(div9, t18);
    			append_dev(div9, div6);
    			append_dev(div6, p7);
    			append_dev(p7, span1);
    			append_dev(p7, t20);
    			append_dev(div6, t21);
    			append_dev(div6, p8);
    			append_dev(div6, t23);
    			append_dev(div6, p9);
    			append_dev(div9, t25);
    			append_dev(div9, div7);
    			append_dev(div7, p10);
    			append_dev(div7, t27);
    			append_dev(div7, p11);
    			append_dev(div9, t29);
    			append_dev(div9, div8);
    			append_dev(div8, p12);
    			append_dev(div8, t31);
    			append_dev(div8, p13);
    			append_dev(div25, t33);
    			append_dev(div25, div14);
    			append_dev(div14, div10);
    			append_dev(div14, t34);
    			append_dev(div14, img2);
    			append_dev(div14, t35);
    			append_dev(div14, div11);
    			append_dev(div11, p14);
    			append_dev(p14, span2);
    			append_dev(p14, t37);
    			append_dev(div11, t38);
    			append_dev(div11, p15);
    			append_dev(div11, t40);
    			append_dev(div11, p16);
    			append_dev(div14, t42);
    			append_dev(div14, div12);
    			append_dev(div12, p17);
    			append_dev(div12, t44);
    			append_dev(div12, p18);
    			append_dev(div14, t46);
    			append_dev(div14, div13);
    			append_dev(div13, p19);
    			append_dev(div13, t48);
    			append_dev(div13, p20);
    			append_dev(div25, t50);
    			append_dev(div25, div19);
    			append_dev(div19, div15);
    			append_dev(div19, t51);
    			append_dev(div19, img3);
    			append_dev(div19, t52);
    			append_dev(div19, div16);
    			append_dev(div16, p21);
    			append_dev(p21, span3);
    			append_dev(p21, t54);
    			append_dev(div16, t55);
    			append_dev(div16, p22);
    			append_dev(div16, t57);
    			append_dev(div16, p23);
    			append_dev(div19, t59);
    			append_dev(div19, div17);
    			append_dev(div17, p24);
    			append_dev(div17, t61);
    			append_dev(div17, p25);
    			append_dev(div19, t63);
    			append_dev(div19, div18);
    			append_dev(div18, p26);
    			append_dev(div18, t65);
    			append_dev(div18, p27);
    			append_dev(div25, t67);
    			append_dev(div25, div24);
    			append_dev(div24, div20);
    			append_dev(div24, t68);
    			append_dev(div24, img4);
    			append_dev(div24, t69);
    			append_dev(div24, div21);
    			append_dev(div21, p28);
    			append_dev(p28, t70);
    			append_dev(p28, span4);
    			append_dev(p28, t72);
    			append_dev(div21, t73);
    			append_dev(div21, p29);
    			append_dev(div24, t75);
    			append_dev(div24, div22);
    			append_dev(div22, p30);
    			append_dev(div22, t77);
    			append_dev(div22, p31);
    			append_dev(div24, t79);
    			append_dev(div24, div23);
    			append_dev(div23, p32);
    			append_dev(div23, t81);
    			append_dev(div23, p33);
    			append_dev(figure, t83);
    			append_dev(figure, aside);
    			append_dev(aside, div26);
    			append_dev(div26, t84);
    			append_dev(div26, br);
    			append_dev(div26, t85);
    			append_dev(div26, t86);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imageTitle*/ 1) set_data_dev(t84, /*imageTitle*/ ctx[0]);
    			if (dirty & /*imageSource*/ 2) set_data_dev(t86, /*imageSource*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
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
    	let len = img.length;
    	const writable_props = ['img', 'imageTitle', 'imageSource'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(2, img = $$props.img);
    		if ('imageTitle' in $$props) $$invalidate(0, imageTitle = $$props.imageTitle);
    		if ('imageSource' in $$props) $$invalidate(1, imageSource = $$props.imageSource);
    	};

    	$$self.$capture_state = () => ({ img, imageTitle, imageSource, len });

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(2, img = $$props.img);
    		if ('imageTitle' in $$props) $$invalidate(0, imageTitle = $$props.imageTitle);
    		if ('imageSource' in $$props) $$invalidate(1, imageSource = $$props.imageSource);
    		if ('len' in $$props) len = $$props.len;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imageTitle, imageSource, img];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { img: 2, imageTitle: 0, imageSource: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imageTitle*/ ctx[0] === undefined && !('imageTitle' in props)) {
    			console.warn("<Image> was created without expected prop 'imageTitle'");
    		}

    		if (/*imageSource*/ ctx[1] === undefined && !('imageSource' in props)) {
    			console.warn("<Image> was created without expected prop 'imageSource'");
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

    // (8:4) {#each credit as person}
    function create_each_block(ctx) {
    	let div4;
    	let div0;
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
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div5 = element("div");
    			attr_dev(div0, "class", "profpic svelte-lqgbcl");
    			add_location(div0, file$2, 9, 12, 203);
    			attr_dev(div1, "class", "role");
    			add_location(div1, file$2, 11, 16, 284);
    			attr_dev(div2, "class", "name svelte-lqgbcl");
    			add_location(div2, file$2, 12, 16, 341);
    			attr_dev(div3, "class", "profname svelte-lqgbcl");
    			add_location(div3, file$2, 10, 12, 244);
    			attr_dev(div4, "class", "profile svelte-lqgbcl");
    			attr_dev(div4, "id", "p1");
    			add_location(div4, file$2, 8, 8, 160);
    			attr_dev(div5, "class", "profile-bar svelte-lqgbcl");
    			add_location(div5, file$2, 15, 8, 425);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
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
    		source: "(8:4) {#each credit as person}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let div;
    	let t0;
    	let t1;
    	let br0;
    	let t2;
    	let t3;
    	let br1;
    	let each_value = /*credit*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			t0 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			br0 = element("br");
    			t2 = text("\r\n    Sumber: ");
    			t3 = text(/*source*/ ctx[1]);
    			br1 = element("br");
    			attr_dev(div, "class", "section-bar svelte-lqgbcl");
    			add_location(div, file$2, 6, 4, 89);
    			add_location(br0, file$2, 18, 4, 482);
    			add_location(br1, file$2, 19, 22, 510);
    			attr_dev(section, "class", "svelte-lqgbcl");
    			add_location(section, file$2, 5, 0, 74);
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
    			append_dev(section, br0);
    			append_dev(section, t2);
    			append_dev(section, t3);
    			append_dev(section, br1);
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

    			if (dirty & /*source*/ 2) set_data_dev(t3, /*source*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
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

    // (289:24) 
    function create_if_block_4(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div3;
    	let div2;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div5;
    	let div4;
    	let t4;
    	let img2;
    	let img2_src_value;
    	let t5;
    	let div7;
    	let div6;
    	let t6;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div9;
    	let div8;
    	let t8;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			img2 = element("img");
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t6 = space();
    			img3 = element("img");
    			t7 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t8 = space();
    			img4 = element("img");
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 292, 5, 15536);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-bts-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-bts.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 293, 7, 15587);
    			attr_dev(div1, "id", "g-Korean-Waves-smallplus-bts");
    			attr_dev(div1, "class", "g-artboard svelte-12pf3up");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 291, 4, 15362);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 298, 4, 15953);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-bts-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-bts.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 299, 6, 16005);
    			attr_dev(div3, "id", "g-Korean-Waves-submedium-bts");
    			attr_dev(div3, "class", "g-artboard svelte-12pf3up");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 297, 4, 15761);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 304, 4, 16362);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-bts-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-bts.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 305, 6, 16414);
    			attr_dev(div5, "id", "g-Korean-Waves-medium-bts");
    			attr_dev(div5, "class", "g-artboard svelte-12pf3up");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 303, 4, 16173);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 310, 4, 16761);
    			attr_dev(img3, "id", "g-Korean-Waves-large-bts-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-bts.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 311, 6, 16808);
    			attr_dev(div7, "id", "g-Korean-Waves-large-bts");
    			attr_dev(div7, "class", "g-artboard svelte-12pf3up");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 309, 4, 16575);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 316, 4, 17103);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-bts-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-bts.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 317, 6, 17152);
    			attr_dev(div9, "id", "g-Korean-Waves-xlarge-bts");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 315, 4, 16968);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div3, t2);
    			append_dev(div3, img1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div5, t4);
    			append_dev(div5, img2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div7, t6);
    			append_dev(div7, img3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div9, t8);
    			append_dev(div9, img4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(289:24) ",
    		ctx
    	});

    	return block;
    }

    // (257:24) 
    function create_if_block_3(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div3;
    	let div2;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div5;
    	let div4;
    	let t4;
    	let img2;
    	let img2_src_value;
    	let t5;
    	let div7;
    	let div6;
    	let t6;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div9;
    	let div8;
    	let t8;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			img2 = element("img");
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t6 = space();
    			img3 = element("img");
    			t7 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t8 = space();
    			img4 = element("img");
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 260, 5, 13533);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-bts-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-bts.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 261, 7, 13584);
    			attr_dev(div1, "id", "g-Korean-Waves-smallplus-bts");
    			attr_dev(div1, "class", "g-artboard svelte-12pf3up");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 259, 4, 13359);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 266, 4, 13950);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-bts-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-bts.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 267, 6, 14002);
    			attr_dev(div3, "id", "g-Korean-Waves-submedium-bts");
    			attr_dev(div3, "class", "g-artboard svelte-12pf3up");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 265, 4, 13758);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 272, 4, 14359);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-bts-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-bts.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 273, 6, 14411);
    			attr_dev(div5, "id", "g-Korean-Waves-medium-bts");
    			attr_dev(div5, "class", "g-artboard svelte-12pf3up");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 271, 4, 14170);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 278, 4, 14758);
    			attr_dev(img3, "id", "g-Korean-Waves-large-bts-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-bts.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 279, 6, 14805);
    			attr_dev(div7, "id", "g-Korean-Waves-large-bts");
    			attr_dev(div7, "class", "g-artboard svelte-12pf3up");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 277, 4, 14572);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 284, 4, 15100);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-bts-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-bts.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 285, 6, 15149);
    			attr_dev(div9, "id", "g-Korean-Waves-xlarge-bts");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 283, 4, 14965);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div3, t2);
    			append_dev(div3, img1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div5, t4);
    			append_dev(div5, img2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div7, t6);
    			append_dev(div7, img3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div9, t8);
    			append_dev(div9, img4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(257:24) ",
    		ctx
    	});

    	return block;
    }

    // (224:24) 
    function create_if_block_2(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div3;
    	let div2;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div5;
    	let div4;
    	let t4;
    	let img2;
    	let img2_src_value;
    	let t5;
    	let div7;
    	let div6;
    	let t6;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div9;
    	let div8;
    	let t8;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			img2 = element("img");
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t6 = space();
    			img3 = element("img");
    			t7 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t8 = space();
    			img4 = element("img");
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 227, 4, 11524);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-exo-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-exo.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 228, 6, 11574);
    			attr_dev(div1, "id", "g-Korean-Waves-smallplus-exo");
    			attr_dev(div1, "class", "g-artboard svelte-12pf3up");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 226, 4, 11351);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 233, 4, 11940);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-exo-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-exo.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 234, 6, 11992);
    			attr_dev(div3, "id", "g-Korean-Waves-submedium-exo");
    			attr_dev(div3, "class", "g-artboard svelte-12pf3up");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 232, 5, 11748);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 239, 4, 12352);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-exo-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-exo.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 240, 6, 12404);
    			attr_dev(div5, "id", "g-Korean-Waves-medium-exo");
    			attr_dev(div5, "class", "g-artboard svelte-12pf3up");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 238, 5, 12163);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 245, 4, 12754);
    			attr_dev(img3, "id", "g-Korean-Waves-large-exo-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-exo.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 246, 6, 12801);
    			attr_dev(div7, "id", "g-Korean-Waves-large-exo");
    			attr_dev(div7, "class", "g-artboard svelte-12pf3up");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 244, 5, 12568);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 251, 4, 13099);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-exo-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-exo.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 252, 6, 13148);
    			attr_dev(div9, "id", "g-Korean-Waves-xlarge-exo");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 250, 5, 12964);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div3, t2);
    			append_dev(div3, img1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div5, t4);
    			append_dev(div5, img2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div7, t6);
    			append_dev(div7, img3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div9, t8);
    			append_dev(div9, img4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(224:24) ",
    		ctx
    	});

    	return block;
    }

    // (191:24) 
    function create_if_block_1(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div3;
    	let div2;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div5;
    	let div4;
    	let t4;
    	let img2;
    	let img2_src_value;
    	let t5;
    	let div7;
    	let div6;
    	let t6;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div9;
    	let div8;
    	let t8;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			img2 = element("img");
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t6 = space();
    			img3 = element("img");
    			t7 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t8 = space();
    			img4 = element("img");
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 194, 5, 9408);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-redvelvet-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-redvelvet.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 195, 6, 9458);
    			attr_dev(div1, "id", "g-Korean-Waves-smallplus-redvelvet");
    			attr_dev(div1, "class", "g-artboard svelte-12pf3up");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 193, 4, 9228);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 200, 4, 9848);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-redvelvet-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-redvelvet.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 201, 6, 9900);
    			attr_dev(div3, "id", "g-Korean-Waves-submedium-redvelvet");
    			attr_dev(div3, "class", "g-artboard svelte-12pf3up");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 199, 5, 9650);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 206, 4, 10284);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-redvelvet-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-redvelvet.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 207, 6, 10336);
    			attr_dev(div5, "id", "g-Korean-Waves-medium-redvelvet");
    			attr_dev(div5, "class", "g-artboard svelte-12pf3up");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 205, 5, 10089);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 212, 4, 10710);
    			attr_dev(img3, "id", "g-Korean-Waves-large-redvelvet-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-redvelvet.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 213, 6, 10757);
    			attr_dev(div7, "id", "g-Korean-Waves-large-redvelvet");
    			attr_dev(div7, "class", "g-artboard svelte-12pf3up");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 211, 5, 10518);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 218, 4, 11079);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-redvelvet-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-redvelvet.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 219, 6, 11128);
    			attr_dev(div9, "id", "g-Korean-Waves-xlarge-redvelvet");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 217, 5, 10938);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div3, t2);
    			append_dev(div3, img1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div5, t4);
    			append_dev(div5, img2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div7, t6);
    			append_dev(div7, img3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div9, t8);
    			append_dev(div9, img4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(191:24) ",
    		ctx
    	});

    	return block;
    }

    // (158:3) {#if index == 0}
    function create_if_block(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div3;
    	let div2;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div5;
    	let div4;
    	let t4;
    	let img2;
    	let img2_src_value;
    	let t5;
    	let div7;
    	let div6;
    	let t6;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div9;
    	let div8;
    	let t8;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			img2 = element("img");
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t6 = space();
    			img3 = element("img");
    			t7 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t8 = space();
    			img4 = element("img");
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 161, 4, 7327);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-moonjae-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-moonjae.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 162, 6, 7377);
    			attr_dev(div1, "id", "g-Korean-Waves-smallplus-moonjae");
    			attr_dev(div1, "class", "g-artboard svelte-12pf3up");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 160, 4, 7150);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 167, 4, 7756);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-moonjae-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-moonjae.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 168, 6, 7808);
    			attr_dev(div3, "id", "g-Korean-Waves-submedium-moonjae");
    			attr_dev(div3, "class", "g-artboard svelte-12pf3up");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 166, 4, 7560);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 173, 4, 8181);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-moonjae-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-moonjae.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 174, 6, 8233);
    			attr_dev(div5, "id", "g-Korean-Waves-medium-moonjae");
    			attr_dev(div5, "class", "g-artboard svelte-12pf3up");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 172, 4, 7988);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 179, 4, 8596);
    			attr_dev(img3, "id", "g-Korean-Waves-large-moonjae-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-moonjae.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 180, 6, 8643);
    			attr_dev(div7, "id", "g-Korean-Waves-large-moonjae");
    			attr_dev(div7, "class", "g-artboard svelte-12pf3up");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 178, 4, 8406);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 185, 4, 8954);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-moonjae-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-moonjae.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 186, 6, 9003);
    			attr_dev(div9, "id", "g-Korean-Waves-xlarge-moonjae");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 184, 4, 8815);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div3, t2);
    			append_dev(div3, img1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div5, t4);
    			append_dev(div5, img2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div7, t6);
    			append_dev(div7, img3);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div9, t8);
    			append_dev(div9, img4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(158:3) {#if index == 0}",
    		ctx
    	});

    	return block;
    }

    // (156:2) 
    function create_background_slot(ctx) {
    	let div1;
    	let div0;

    	function select_block_type(ctx, dirty) {
    		if (/*index*/ ctx[1] == 0) return create_if_block;
    		if (/*index*/ ctx[1] == 1) return create_if_block_1;
    		if (/*index*/ ctx[1] == 2) return create_if_block_2;
    		if (/*index*/ ctx[1] == 3) return create_if_block_3;
    		if (/*index*/ ctx[1] == 4) return create_if_block_4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "id", "g-Korean-Waves-box");
    			attr_dev(div0, "class", "ai2html svelte-12pf3up");
    			add_location(div0, file, 156, 3, 7016);
    			attr_dev(div1, "slot", "background");
    			attr_dev(div1, "class", "svelte-12pf3up");
    			add_location(div1, file, 155, 2, 6989);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			if (if_block) if_block.m(div0, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_background_slot.name,
    		type: "slot",
    		source: "(156:2) ",
    		ctx
    	});

    	return block;
    }

    // (325:2) 
    function create_foreground_slot(ctx) {
    	let div;
    	let section0;
    	let t0;
    	let section1;
    	let p0;
    	let t2;
    	let section2;
    	let p1;
    	let t4;
    	let section3;
    	let p2;
    	let t6;
    	let section4;
    	let p3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			section0 = element("section");
    			t0 = space();
    			section1 = element("section");
    			p0 = element("p");
    			p0.textContent = "Presiden Moon Jae-in kerap membawa grup-grup kpop sebagai pendamping diplomatisnya;";
    			t2 = space();
    			section2 = element("section");
    			p1 = element("p");
    			p1.textContent = "Red Velvet menjadi utusan kebudayaan di konser Korea Utara di tahun 2018,";
    			t4 = space();
    			section3 = element("section");
    			p2 = element("p");
    			p2.textContent = "EXO bertemu dengan Donald Trump di tahun 2019,";
    			t6 = space();
    			section4 = element("section");
    			p3 = element("p");
    			p3.textContent = "dan BTS yang dilantik sebagai diplomat khusus di tahun 2021.";
    			attr_dev(section0, "class", "svelte-12pf3up");
    			add_location(section0, file, 325, 3, 17332);
    			attr_dev(p0, "class", "svelte-12pf3up");
    			add_location(p0, file, 327, 4, 17369);
    			attr_dev(section1, "class", "svelte-12pf3up");
    			add_location(section1, file, 326, 3, 17355);
    			attr_dev(p1, "class", "svelte-12pf3up");
    			add_location(p1, file, 332, 4, 17502);
    			attr_dev(section2, "class", "svelte-12pf3up");
    			add_location(section2, file, 331, 3, 17488);
    			attr_dev(p2, "class", "svelte-12pf3up");
    			add_location(p2, file, 337, 4, 17625);
    			attr_dev(section3, "class", "svelte-12pf3up");
    			add_location(section3, file, 336, 3, 17611);
    			attr_dev(p3, "class", "svelte-12pf3up");
    			add_location(p3, file, 342, 4, 17721);
    			attr_dev(section4, "class", "svelte-12pf3up");
    			add_location(section4, file, 341, 3, 17707);
    			attr_dev(div, "slot", "foreground");
    			attr_dev(div, "class", "svelte-12pf3up");
    			add_location(div, file, 324, 2, 17304);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, section0);
    			append_dev(div, t0);
    			append_dev(div, section1);
    			append_dev(section1, p0);
    			append_dev(div, t2);
    			append_dev(div, section2);
    			append_dev(section2, p1);
    			append_dev(div, t4);
    			append_dev(div, section3);
    			append_dev(section3, p2);
    			append_dev(div, t6);
    			append_dev(div, section4);
    			append_dev(section4, p3);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_foreground_slot.name,
    		type: "slot",
    		source: "(325:2) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div25;
    	let div4;
    	let div0;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div1;
    	let p0;
    	let t3;
    	let div2;
    	let p1;
    	let t5;
    	let div3;
    	let p2;
    	let t7;
    	let div9;
    	let div5;
    	let t8;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let div6;
    	let p3;
    	let t11;
    	let div7;
    	let p4;
    	let t13;
    	let div8;
    	let p5;
    	let t15;
    	let div14;
    	let div10;
    	let t16;
    	let img2;
    	let img2_src_value;
    	let t17;
    	let div11;
    	let p6;
    	let t19;
    	let div12;
    	let p7;
    	let t21;
    	let div13;
    	let p8;
    	let t23;
    	let div19;
    	let div15;
    	let t24;
    	let img3;
    	let img3_src_value;
    	let t25;
    	let div16;
    	let p9;
    	let t27;
    	let div17;
    	let p10;
    	let t29;
    	let div18;
    	let p11;
    	let t31;
    	let div24;
    	let div20;
    	let t32;
    	let img4;
    	let img4_src_value;
    	let t33;
    	let div21;
    	let p12;
    	let t35;
    	let div22;
    	let p13;
    	let t37;
    	let div23;
    	let p14;
    	let t39;
    	let header;
    	let div;
    	let t40;
    	let div26;
    	let t41;
    	let scroller;
    	let updating_count;
    	let updating_index;
    	let updating_offset;
    	let updating_progress;
    	let t42;
    	let div27;
    	let t43;
    	let paragraph0;
    	let div_1;
    	let t44;
    	let div53;
    	let div32;
    	let div28;
    	let t45;
    	let img5;
    	let img5_src_value;
    	let t46;
    	let div29;
    	let p15;
    	let span0;
    	let t48;
    	let t49;
    	let p16;
    	let t51;
    	let p17;
    	let t53;
    	let div30;
    	let p18;
    	let t55;
    	let p19;
    	let t57;
    	let div31;
    	let p20;
    	let t59;
    	let p21;
    	let t61;
    	let div37;
    	let div33;
    	let t62;
    	let img6;
    	let img6_src_value;
    	let t63;
    	let div34;
    	let p22;
    	let span1;
    	let t65;
    	let t66;
    	let p23;
    	let t68;
    	let p24;
    	let t70;
    	let div35;
    	let p25;
    	let t72;
    	let p26;
    	let t74;
    	let div36;
    	let p27;
    	let t76;
    	let p28;
    	let t78;
    	let div42;
    	let div38;
    	let t79;
    	let img7;
    	let img7_src_value;
    	let t80;
    	let div39;
    	let p29;
    	let span2;
    	let t82;
    	let t83;
    	let p30;
    	let t85;
    	let p31;
    	let t87;
    	let div40;
    	let p32;
    	let t89;
    	let p33;
    	let t91;
    	let div41;
    	let p34;
    	let t93;
    	let p35;
    	let t95;
    	let div47;
    	let div43;
    	let t96;
    	let img8;
    	let img8_src_value;
    	let t97;
    	let div44;
    	let p36;
    	let span3;
    	let t99;
    	let t100;
    	let p37;
    	let t102;
    	let p38;
    	let t104;
    	let div45;
    	let p39;
    	let t106;
    	let p40;
    	let t108;
    	let div46;
    	let p41;
    	let t110;
    	let p42;
    	let t112;
    	let div52;
    	let div48;
    	let t113;
    	let img9;
    	let img9_src_value;
    	let t114;
    	let div49;
    	let p43;
    	let t115;
    	let span4;
    	let t117;
    	let t118;
    	let p44;
    	let t120;
    	let div50;
    	let p45;
    	let t122;
    	let p46;
    	let t124;
    	let div51;
    	let p47;
    	let t126;
    	let p48;
    	let t128;
    	let paragraph1;
    	let div_2;
    	let t129;
    	let credit_1;
    	let div_3;
    	let current;

    	header = new Header({
    			props: {
    				fullHeader: false,
    				title: "Diplomasi K-Pop",
    				subhead: "Suka tidak suka, keberadaan artis dan/atau idola Kpop akan muncul di depan mata Anda. Entah dalam bentuk billboard BTS segede gaban di pinggir jalan, potongan lagu girl/boy group di akun Youtube gratisan, atau idola yang menjadi brand ambassador marketplace. Kedatangan hallyu wave terasa seperti bom yang tiba-tiba meledak.\n\n\t\tNamun yang membuat kpop jauh lebih menarik dari dunia hiburan lainnya adalah dukungan negara yang begitu besar.",
    				author: "Volutpat Sapien",
    				date: ""
    			},
    			$$inline: true
    		});

    	function scroller_count_binding(value) {
    		/*scroller_count_binding*/ ctx[15](value);
    	}

    	function scroller_index_binding(value) {
    		/*scroller_index_binding*/ ctx[16](value);
    	}

    	function scroller_offset_binding(value) {
    		/*scroller_offset_binding*/ ctx[17](value);
    	}

    	function scroller_progress_binding(value) {
    		/*scroller_progress_binding*/ ctx[18](value);
    	}

    	let scroller_props = {
    		top: /*top*/ ctx[4],
    		threshold: /*threshold*/ ctx[5],
    		bottom: /*bottom*/ ctx[6],
    		$$slots: {
    			foreground: [create_foreground_slot],
    			background: [create_background_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*count*/ ctx[0] !== void 0) {
    		scroller_props.count = /*count*/ ctx[0];
    	}

    	if (/*index*/ ctx[1] !== void 0) {
    		scroller_props.index = /*index*/ ctx[1];
    	}

    	if (/*offset*/ ctx[2] !== void 0) {
    		scroller_props.offset = /*offset*/ ctx[2];
    	}

    	if (/*progress*/ ctx[3] !== void 0) {
    		scroller_props.progress = /*progress*/ ctx[3];
    	}

    	scroller = new Scroller({ props: scroller_props, $$inline: true });
    	binding_callbacks.push(() => bind(scroller, 'count', scroller_count_binding));
    	binding_callbacks.push(() => bind(scroller, 'index', scroller_index_binding));
    	binding_callbacks.push(() => bind(scroller, 'offset', scroller_offset_binding));
    	binding_callbacks.push(() => bind(scroller, 'progress', scroller_progress_binding));

    	paragraph0 = new Paragraph({
    			props: {
    				para: [
    					'Begitu menguntungkannya hubungan antara kpop dengan pemerintahan Korsel sampai-sampai pemerintah membuat tim khusus untuk mempromosikan kpop ke dunia. Namun kesuksesan ini tak akan eksis tanpa adanya bekingan yang besar ke teknologi pendukung, seperti internet cepat dan modal ke perusahaan-perusahaan teknologi lokal. Ini terlihat di pemetaan dana pemerintah di tahun 2012: sepertiga dari modal usaha negara dihabiskan di industri entertainmen.'
    				]
    			},
    			$$inline: true
    		});

    	paragraph1 = new Paragraph({
    			props: {
    				para: [
    					'Namun penggunaan kpop sebagai alat diplomasi ini tak selalu positif. Pemerintah Tiongkok memblokir konten kpop dan kdrama karena Korsel membuat perjanjian militer dengan Amerika Serikat. Hasilnya, kpop terpaksa memfokuskan pasarnya ke Asia Pasifik, salah satunya Indonesia. Strategi ini terhitung sukses: Indonesia merupakan negara paling “berisik” (dan mungkin juga salah satu yang paling banyak menggelontorkan uang) soal kpop di dunia maya. '
    				]
    			},
    			$$inline: true
    		});

    	credit_1 = new Credit({
    			props: {
    				source: /*source*/ ctx[14],
    				credit: /*credit*/ ctx[13]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div25 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "KOREAN WAVES";
    			t3 = space();
    			div2 = element("div");
    			p1 = element("p");
    			p1.textContent = "한";
    			t5 = space();
    			div3 = element("div");
    			p2 = element("p");
    			p2.textContent = "류";
    			t7 = space();
    			div9 = element("div");
    			div5 = element("div");
    			t8 = space();
    			img1 = element("img");
    			t9 = space();
    			div6 = element("div");
    			p3 = element("p");
    			p3.textContent = "KOREAN WAVES";
    			t11 = space();
    			div7 = element("div");
    			p4 = element("p");
    			p4.textContent = "한";
    			t13 = space();
    			div8 = element("div");
    			p5 = element("p");
    			p5.textContent = "류";
    			t15 = space();
    			div14 = element("div");
    			div10 = element("div");
    			t16 = space();
    			img2 = element("img");
    			t17 = space();
    			div11 = element("div");
    			p6 = element("p");
    			p6.textContent = "KOREAN WAVES";
    			t19 = space();
    			div12 = element("div");
    			p7 = element("p");
    			p7.textContent = "한";
    			t21 = space();
    			div13 = element("div");
    			p8 = element("p");
    			p8.textContent = "류";
    			t23 = space();
    			div19 = element("div");
    			div15 = element("div");
    			t24 = space();
    			img3 = element("img");
    			t25 = space();
    			div16 = element("div");
    			p9 = element("p");
    			p9.textContent = "KOREAN WAVES";
    			t27 = space();
    			div17 = element("div");
    			p10 = element("p");
    			p10.textContent = "한";
    			t29 = space();
    			div18 = element("div");
    			p11 = element("p");
    			p11.textContent = "류";
    			t31 = space();
    			div24 = element("div");
    			div20 = element("div");
    			t32 = space();
    			img4 = element("img");
    			t33 = space();
    			div21 = element("div");
    			p12 = element("p");
    			p12.textContent = "KOREAN WAVES";
    			t35 = space();
    			div22 = element("div");
    			p13 = element("p");
    			p13.textContent = "한";
    			t37 = space();
    			div23 = element("div");
    			p14 = element("p");
    			p14.textContent = "류";
    			t39 = space();
    			div = element("div");
    			create_component(header.$$.fragment);
    			t40 = space();
    			div26 = element("div");
    			t41 = space();
    			create_component(scroller.$$.fragment);
    			t42 = space();
    			div27 = element("div");
    			t43 = space();
    			div_1 = element("div");
    			create_component(paragraph0.$$.fragment);
    			t44 = space();
    			div53 = element("div");
    			div32 = element("div");
    			div28 = element("div");
    			t45 = space();
    			img5 = element("img");
    			t46 = space();
    			div29 = element("div");
    			p15 = element("p");
    			span0 = element("span");
    			span0.textContent = "EFEK ";
    			t48 = text("HALLYU");
    			t49 = space();
    			p16 = element("p");
    			p16.textContent = "PADA PDB";
    			t51 = space();
    			p17 = element("p");
    			p17.textContent = "KOREA SELATAN";
    			t53 = space();
    			div30 = element("div");
    			p18 = element("p");
    			p18.textContent = "$ 1,87 Miliar";
    			t55 = space();
    			p19 = element("p");
    			p19.textContent = "2004";
    			t57 = space();
    			div31 = element("div");
    			p20 = element("p");
    			p20.textContent = "$ 12,3 Miliar";
    			t59 = space();
    			p21 = element("p");
    			p21.textContent = "2019";
    			t61 = space();
    			div37 = element("div");
    			div33 = element("div");
    			t62 = space();
    			img6 = element("img");
    			t63 = space();
    			div34 = element("div");
    			p22 = element("p");
    			span1 = element("span");
    			span1.textContent = "EFEK ";
    			t65 = text("HALLYU");
    			t66 = space();
    			p23 = element("p");
    			p23.textContent = "PADA PDB";
    			t68 = space();
    			p24 = element("p");
    			p24.textContent = "KOREA SELATAN";
    			t70 = space();
    			div35 = element("div");
    			p25 = element("p");
    			p25.textContent = "$ 1,87 Miliar";
    			t72 = space();
    			p26 = element("p");
    			p26.textContent = "2004";
    			t74 = space();
    			div36 = element("div");
    			p27 = element("p");
    			p27.textContent = "$ 12,3 Miliar";
    			t76 = space();
    			p28 = element("p");
    			p28.textContent = "2019";
    			t78 = space();
    			div42 = element("div");
    			div38 = element("div");
    			t79 = space();
    			img7 = element("img");
    			t80 = space();
    			div39 = element("div");
    			p29 = element("p");
    			span2 = element("span");
    			span2.textContent = "EFEK ";
    			t82 = text("HALLYU");
    			t83 = space();
    			p30 = element("p");
    			p30.textContent = "PADA PDB";
    			t85 = space();
    			p31 = element("p");
    			p31.textContent = "KOREA SELATAN";
    			t87 = space();
    			div40 = element("div");
    			p32 = element("p");
    			p32.textContent = "$ 1,87 Miliar";
    			t89 = space();
    			p33 = element("p");
    			p33.textContent = "2004";
    			t91 = space();
    			div41 = element("div");
    			p34 = element("p");
    			p34.textContent = "$ 12,3 Miliar";
    			t93 = space();
    			p35 = element("p");
    			p35.textContent = "2019";
    			t95 = space();
    			div47 = element("div");
    			div43 = element("div");
    			t96 = space();
    			img8 = element("img");
    			t97 = space();
    			div44 = element("div");
    			p36 = element("p");
    			span3 = element("span");
    			span3.textContent = "EFEK ";
    			t99 = text("HALLYU");
    			t100 = space();
    			p37 = element("p");
    			p37.textContent = "PADA PDB";
    			t102 = space();
    			p38 = element("p");
    			p38.textContent = "KOREA SELATAN";
    			t104 = space();
    			div45 = element("div");
    			p39 = element("p");
    			p39.textContent = "$ 1,87 Miliar";
    			t106 = space();
    			p40 = element("p");
    			p40.textContent = "2004";
    			t108 = space();
    			div46 = element("div");
    			p41 = element("p");
    			p41.textContent = "$ 12,3 Miliar";
    			t110 = space();
    			p42 = element("p");
    			p42.textContent = "2019";
    			t112 = space();
    			div52 = element("div");
    			div48 = element("div");
    			t113 = space();
    			img9 = element("img");
    			t114 = space();
    			div49 = element("div");
    			p43 = element("p");
    			t115 = text("EFEK ");
    			span4 = element("span");
    			span4.textContent = "HALLYU ";
    			t117 = text("PADA PDB");
    			t118 = space();
    			p44 = element("p");
    			p44.textContent = "KOREA SELATAN";
    			t120 = space();
    			div50 = element("div");
    			p45 = element("p");
    			p45.textContent = "$ 1,87 Miliar";
    			t122 = space();
    			p46 = element("p");
    			p46.textContent = "2004";
    			t124 = space();
    			div51 = element("div");
    			p47 = element("p");
    			p47.textContent = "$ 12,3 Miliar";
    			t126 = space();
    			p48 = element("p");
    			p48.textContent = "2019";
    			t128 = space();
    			div_2 = element("div");
    			create_component(paragraph1.$$.fragment);
    			t129 = space();
    			div_3 = element("div");
    			create_component(credit_1.$$.fragment);
    			set_style(div0, "padding", "0 0 218.75% 0");
    			add_location(div0, file, 52, 0, 1593);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-cover-img");
    			attr_dev(img0, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-cover.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 53, 2, 1639);
    			attr_dev(p0, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p0, file, 55, 3, 1905);
    			attr_dev(div1, "id", "g-ai0-1");
    			attr_dev(div1, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div1, "top", "8.6136%");
    			set_style(div1, "margin-top", "-15.3px");
    			set_style(div1, "left", "49.966%");
    			set_style(div1, "margin-left", "-120px");
    			set_style(div1, "width", "240px");
    			add_location(div1, file, 54, 2, 1759);
    			attr_dev(p1, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p1, file, 58, 3, 2101);
    			attr_dev(div2, "id", "g-ai0-2");
    			attr_dev(div2, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div2, "top", "18.5861%");
    			set_style(div2, "margin-top", "-72.1px");
    			set_style(div2, "left", "29.2279%");
    			set_style(div2, "margin-left", "-62px");
    			set_style(div2, "width", "124px");
    			add_location(div2, file, 57, 2, 1954);
    			attr_dev(p2, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p2, file, 61, 3, 2288);
    			attr_dev(div3, "id", "g-ai0-3");
    			attr_dev(div3, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div3, "top", "18.5861%");
    			set_style(div3, "margin-top", "-72.1px");
    			set_style(div3, "left", "70.6763%");
    			set_style(div3, "margin-left", "-62.5px");
    			set_style(div3, "width", "125px");
    			add_location(div3, file, 60, 2, 2139);
    			attr_dev(div4, "id", "g-Korean-Waves-smallplus-cover");
    			attr_dev(div4, "class", "g-artboard svelte-12pf3up");
    			set_style(div4, "max-width", "509px");
    			set_style(div4, "max-height", "1113px");
    			attr_dev(div4, "data-aspect-ratio", "0.457");
    			attr_dev(div4, "data-min-width", "0");
    			attr_dev(div4, "data-max-width", "509");
    			add_location(div4, file, 51, 0, 1422);
    			set_style(div5, "padding", "0 0 156.8627% 0");
    			add_location(div5, file, 67, 0, 2560);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-cover-img");
    			attr_dev(img1, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-cover.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 68, 2, 2608);
    			attr_dev(p3, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p3, file, 70, 3, 2877);
    			attr_dev(div6, "id", "g-ai1-1");
    			attr_dev(div6, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div6, "top", "8.7591%");
    			set_style(div6, "margin-top", "-27.1px");
    			set_style(div6, "left", "50.0031%");
    			set_style(div6, "margin-left", "-203.5px");
    			set_style(div6, "width", "407px");
    			add_location(div6, file, 69, 2, 2728);
    			attr_dev(p4, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p4, file, 73, 3, 3075);
    			attr_dev(div7, "id", "g-ai1-2");
    			attr_dev(div7, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div7, "top", "24.0663%");
    			set_style(div7, "margin-top", "-127.5px");
    			set_style(div7, "left", "27.0127%");
    			set_style(div7, "margin-left", "-101px");
    			set_style(div7, "width", "202px");
    			add_location(div7, file, 72, 2, 2926);
    			attr_dev(p5, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p5, file, 76, 3, 3264);
    			attr_dev(div8, "id", "g-ai1-3");
    			attr_dev(div8, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div8, "top", "24.0663%");
    			set_style(div8, "margin-top", "-127.5px");
    			set_style(div8, "left", "72.8175%");
    			set_style(div8, "margin-left", "-101.5px");
    			set_style(div8, "width", "203px");
    			add_location(div8, file, 75, 2, 3113);
    			attr_dev(div9, "id", "g-Korean-Waves-submedium-cover");
    			attr_dev(div9, "class", "g-artboard svelte-12pf3up");
    			set_style(div9, "min-width", "510px");
    			set_style(div9, "max-width", "689px");
    			set_style(div9, "max-height", "1081px");
    			attr_dev(div9, "data-aspect-ratio", "0.638");
    			attr_dev(div9, "data-min-width", "510");
    			attr_dev(div9, "data-max-width", "689");
    			add_location(div9, file, 66, 1, 2370);
    			set_style(div10, "padding", "0 0 148.4058% 0");
    			add_location(div10, file, 82, 0, 3530);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-cover-img");
    			attr_dev(img2, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-cover.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 83, 2, 3578);
    			attr_dev(p6, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p6, file, 85, 3, 3839);
    			attr_dev(div11, "id", "g-ai2-1");
    			attr_dev(div11, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div11, "top", "7.9464%");
    			set_style(div11, "margin-top", "-37.4px");
    			set_style(div11, "left", "49.9641%");
    			set_style(div11, "margin-left", "-274px");
    			set_style(div11, "width", "548px");
    			add_location(div11, file, 84, 2, 3692);
    			attr_dev(p7, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p7, file, 88, 3, 4035);
    			attr_dev(div12, "id", "g-ai2-2");
    			attr_dev(div12, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div12, "top", "24.3176%");
    			set_style(div12, "margin-top", "-174px");
    			set_style(div12, "left", "26.7502%");
    			set_style(div12, "margin-left", "-134px");
    			set_style(div12, "width", "268px");
    			add_location(div12, file, 87, 2, 3888);
    			attr_dev(p8, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p8, file, 91, 3, 4220);
    			attr_dev(div13, "id", "g-ai2-3");
    			attr_dev(div13, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div13, "top", "24.3176%");
    			set_style(div13, "margin-top", "-174px");
    			set_style(div13, "left", "73.0985%");
    			set_style(div13, "margin-left", "-135px");
    			set_style(div13, "width", "270px");
    			add_location(div13, file, 90, 2, 4073);
    			attr_dev(div14, "id", "g-Korean-Waves-medium-cover");
    			attr_dev(div14, "class", "g-artboard svelte-12pf3up");
    			set_style(div14, "min-width", "690px");
    			set_style(div14, "max-width", "919px");
    			set_style(div14, "max-height", "1364px");
    			attr_dev(div14, "data-aspect-ratio", "0.674");
    			attr_dev(div14, "data-min-width", "690");
    			attr_dev(div14, "data-max-width", "919");
    			add_location(div14, file, 81, 1, 3343);
    			set_style(div15, "padding", "0 0 100% 0");
    			add_location(div15, file, 97, 0, 4482);
    			attr_dev(img3, "id", "g-Korean-Waves-large-cover-img");
    			attr_dev(img3, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-cover.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 98, 2, 4525);
    			attr_dev(p9, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p9, file, 100, 3, 4786);
    			attr_dev(div16, "id", "g-ai3-1");
    			attr_dev(div16, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div16, "top", "8.9005%");
    			set_style(div16, "margin-top", "-45.9px");
    			set_style(div16, "left", "50.0203%");
    			set_style(div16, "margin-left", "-338.5px");
    			set_style(div16, "width", "677px");
    			add_location(div16, file, 99, 2, 4637);
    			attr_dev(p10, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p10, file, 103, 3, 4986);
    			attr_dev(div17, "id", "g-ai3-2");
    			attr_dev(div17, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div17, "top", "31.5001%");
    			set_style(div17, "margin-top", "-216.8px");
    			set_style(div17, "left", "27.4754%");
    			set_style(div17, "margin-left", "-163.5px");
    			set_style(div17, "width", "327px");
    			add_location(div17, file, 102, 2, 4835);
    			attr_dev(p11, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p11, file, 106, 3, 5173);
    			attr_dev(div18, "id", "g-ai3-3");
    			attr_dev(div18, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div18, "top", "31.5001%");
    			set_style(div18, "margin-top", "-216.8px");
    			set_style(div18, "left", "70.7239%");
    			set_style(div18, "margin-left", "-165px");
    			set_style(div18, "width", "330px");
    			add_location(div18, file, 105, 2, 5024);
    			attr_dev(div19, "id", "g-Korean-Waves-large-cover");
    			attr_dev(div19, "class", "g-artboard svelte-12pf3up");
    			set_style(div19, "min-width", "920px");
    			set_style(div19, "max-width", "1399px");
    			set_style(div19, "max-height", "1399px");
    			attr_dev(div19, "data-aspect-ratio", "1");
    			attr_dev(div19, "data-min-width", "920");
    			attr_dev(div19, "data-max-width", "1399");
    			add_location(div19, file, 96, 1, 4298);
    			set_style(div20, "padding", "0 0 56.25% 0");
    			add_location(div20, file, 112, 0, 5385);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-cover-img");
    			attr_dev(img4, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-cover.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 113, 2, 5430);
    			attr_dev(p12, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p12, file, 115, 3, 5694);
    			attr_dev(div21, "id", "g-ai4-1");
    			attr_dev(div21, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div21, "top", "12.3028%");
    			set_style(div21, "margin-top", "-45.9px");
    			set_style(div21, "left", "50.0134%");
    			set_style(div21, "margin-left", "-338.5px");
    			set_style(div21, "width", "677px");
    			add_location(div21, file, 114, 2, 5544);
    			attr_dev(p13, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p13, file, 118, 3, 5894);
    			attr_dev(div22, "id", "g-ai4-2");
    			attr_dev(div22, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div22, "top", "38.8319%");
    			set_style(div22, "margin-top", "-216.8px");
    			set_style(div22, "left", "35.7217%");
    			set_style(div22, "margin-left", "-163.5px");
    			set_style(div22, "width", "327px");
    			add_location(div22, file, 117, 2, 5743);
    			attr_dev(p14, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p14, file, 121, 3, 6081);
    			attr_dev(div23, "id", "g-ai4-3");
    			attr_dev(div23, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div23, "top", "38.8319%");
    			set_style(div23, "margin-top", "-216.8px");
    			set_style(div23, "left", "64.1422%");
    			set_style(div23, "margin-left", "-165px");
    			set_style(div23, "width", "330px");
    			add_location(div23, file, 120, 2, 5932);
    			attr_dev(div24, "id", "g-Korean-Waves-xlarge-cover");
    			attr_dev(div24, "class", "g-artboard svelte-12pf3up");
    			set_style(div24, "min-width", "1400px");
    			attr_dev(div24, "data-aspect-ratio", "1.778");
    			attr_dev(div24, "data-min-width", "1400");
    			add_location(div24, file, 111, 1, 5252);
    			attr_dev(div25, "id", "g-Korean-Waves-box");
    			attr_dev(div25, "class", "ai2html svelte-12pf3up");
    			add_location(div25, file, 49, 1, 1339);
    			set_style(div, "display", "contents");
    			set_style(div, "--headerImage", /*headerImage*/ ctx[8]);
    			set_style(div, "--headerBackground", /*headerBackground*/ ctx[9]);
    			set_style(div, "--titleColor", /*titleColor*/ ctx[10]);
    			set_style(div, "--subtitleColor", /*subtitleColor*/ ctx[11]);
    			set_style(div, "--subheadColor", /*subheadColor*/ ctx[12]);
    			attr_dev(div26, "class", "divider svelte-12pf3up");
    			add_location(div26, file, 144, 1, 6855);
    			attr_dev(div27, "class", "divider svelte-12pf3up");
    			add_location(div27, file, 349, 1, 17838);
    			set_style(div_1, "display", "contents");
    			set_style(div_1, "--font-color", "#f9f9e1");
    			set_style(div28, "padding", "0 0 218.75% 0");
    			add_location(div28, file, 368, 2, 18758);
    			attr_dev(img5, "id", "g-Korean-Waves-smallplus-data-img");
    			attr_dev(img5, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img5, "alt", "");
    			if (!src_url_equal(img5.src, img5_src_value = "./images/Korean-Waves-smallplus-data.png")) attr_dev(img5, "src", img5_src_value);
    			add_location(img5, file, 369, 4, 18806);
    			attr_dev(span0, "class", "g-cstyle0 svelte-12pf3up");
    			add_location(span0, file, 371, 26, 19100);
    			attr_dev(p15, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p15, file, 371, 5, 19079);
    			attr_dev(p16, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p16, file, 372, 5, 19152);
    			attr_dev(p17, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p17, file, 373, 5, 19191);
    			attr_dev(div29, "id", "g-ai25-1");
    			attr_dev(div29, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div29, "top", "34.0296%");
    			set_style(div29, "margin-top", "-57.2px");
    			set_style(div29, "left", "49.2184%");
    			set_style(div29, "margin-left", "-148.5px");
    			set_style(div29, "width", "297px");
    			add_location(div29, file, 370, 4, 18926);
    			attr_dev(p18, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p18, file, 376, 5, 19374);
    			attr_dev(p19, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p19, file, 377, 5, 19418);
    			attr_dev(div30, "id", "g-ai25-2");
    			attr_dev(div30, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div30, "top", "51.464%");
    			set_style(div30, "margin-top", "-14.2px");
    			set_style(div30, "left", "4.6825%");
    			set_style(div30, "width", "99px");
    			add_location(div30, file, 375, 4, 19245);
    			attr_dev(p20, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p20, file, 380, 5, 19593);
    			attr_dev(p21, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p21, file, 381, 5, 19637);
    			attr_dev(div31, "id", "g-ai25-3");
    			attr_dev(div31, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div31, "top", "51.464%");
    			set_style(div31, "margin-top", "-14.2px");
    			set_style(div31, "right", "4.0607%");
    			set_style(div31, "width", "99px");
    			add_location(div31, file, 379, 4, 19463);
    			attr_dev(div32, "id", "g-Korean-Waves-smallplus-data");
    			attr_dev(div32, "class", "g-artboard svelte-12pf3up");
    			set_style(div32, "max-width", "509px");
    			set_style(div32, "max-height", "1113px");
    			attr_dev(div32, "data-aspect-ratio", "0.457");
    			attr_dev(div32, "data-min-width", "0");
    			attr_dev(div32, "data-max-width", "509");
    			add_location(div32, file, 367, 1, 18586);
    			set_style(div33, "padding", "0 0 156.8627% 0");
    			add_location(div33, file, 387, 2, 19922);
    			attr_dev(img6, "id", "g-Korean-Waves-submedium-data-img");
    			attr_dev(img6, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img6, "alt", "");
    			if (!src_url_equal(img6.src, img6_src_value = "./images/Korean-Waves-submedium-data.png")) attr_dev(img6, "src", img6_src_value);
    			add_location(img6, file, 388, 4, 19972);
    			attr_dev(span1, "class", "g-cstyle0 svelte-12pf3up");
    			add_location(span1, file, 390, 26, 20266);
    			attr_dev(p22, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p22, file, 390, 5, 20245);
    			attr_dev(p23, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p23, file, 391, 5, 20318);
    			attr_dev(p24, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p24, file, 392, 5, 20357);
    			attr_dev(div34, "id", "g-ai26-1");
    			attr_dev(div34, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div34, "top", "26.7684%");
    			set_style(div34, "margin-top", "-75.1px");
    			set_style(div34, "left", "50.0015%");
    			set_style(div34, "margin-left", "-191.5px");
    			set_style(div34, "width", "383px");
    			add_location(div34, file, 389, 4, 20092);
    			attr_dev(p25, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p25, file, 395, 5, 20542);
    			attr_dev(p26, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p26, file, 396, 5, 20586);
    			attr_dev(div35, "id", "g-ai26-2");
    			attr_dev(div35, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div35, "top", "50.2573%");
    			set_style(div35, "margin-top", "-23.1px");
    			set_style(div35, "left", "3.7282%");
    			set_style(div35, "width", "147px");
    			add_location(div35, file, 394, 4, 20411);
    			attr_dev(p27, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p27, file, 399, 5, 20763);
    			attr_dev(p28, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p28, file, 400, 5, 20807);
    			attr_dev(div36, "id", "g-ai26-3");
    			attr_dev(div36, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div36, "top", "50.2573%");
    			set_style(div36, "margin-top", "-23.1px");
    			set_style(div36, "right", "3.1528%");
    			set_style(div36, "width", "147px");
    			add_location(div36, file, 398, 4, 20631);
    			attr_dev(div37, "id", "g-Korean-Waves-submedium-data");
    			attr_dev(div37, "class", "g-artboard svelte-12pf3up");
    			set_style(div37, "min-width", "510px");
    			set_style(div37, "max-width", "689px");
    			set_style(div37, "max-height", "1081px");
    			attr_dev(div37, "data-aspect-ratio", "0.638");
    			attr_dev(div37, "data-min-width", "510");
    			attr_dev(div37, "data-max-width", "689");
    			add_location(div37, file, 386, 3, 19731);
    			set_style(div38, "padding", "0 0 148.4058% 0");
    			add_location(div38, file, 406, 2, 21086);
    			attr_dev(img7, "id", "g-Korean-Waves-medium-data-img");
    			attr_dev(img7, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img7, "alt", "");
    			if (!src_url_equal(img7.src, img7_src_value = "./images/Korean-Waves-medium-data.png")) attr_dev(img7, "src", img7_src_value);
    			add_location(img7, file, 407, 4, 21136);
    			attr_dev(span2, "class", "g-cstyle0 svelte-12pf3up");
    			add_location(span2, file, 409, 26, 21423);
    			attr_dev(p29, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p29, file, 409, 5, 21402);
    			attr_dev(p30, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p30, file, 410, 5, 21475);
    			attr_dev(p31, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p31, file, 411, 5, 21514);
    			attr_dev(div39, "id", "g-ai27-1");
    			attr_dev(div39, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div39, "top", "27.0156%");
    			set_style(div39, "margin-top", "-107.6px");
    			set_style(div39, "left", "50.0224%");
    			set_style(div39, "margin-left", "-269px");
    			set_style(div39, "width", "538px");
    			add_location(div39, file, 408, 4, 21250);
    			attr_dev(p32, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p32, file, 414, 5, 21699);
    			attr_dev(p33, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p33, file, 415, 5, 21743);
    			attr_dev(div40, "id", "g-ai27-2");
    			attr_dev(div40, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div40, "top", "49.5576%");
    			set_style(div40, "margin-top", "-31.5px");
    			set_style(div40, "left", "4.0423%");
    			set_style(div40, "width", "190px");
    			add_location(div40, file, 413, 4, 21568);
    			attr_dev(p34, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p34, file, 418, 5, 21920);
    			attr_dev(p35, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p35, file, 419, 5, 21964);
    			attr_dev(div41, "id", "g-ai27-3");
    			attr_dev(div41, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div41, "top", "49.5576%");
    			set_style(div41, "margin-top", "-31.5px");
    			set_style(div41, "right", "3.4664%");
    			set_style(div41, "width", "190px");
    			add_location(div41, file, 417, 4, 21788);
    			attr_dev(div42, "id", "g-Korean-Waves-medium-data");
    			attr_dev(div42, "class", "g-artboard svelte-12pf3up");
    			set_style(div42, "min-width", "690px");
    			set_style(div42, "max-width", "919px");
    			set_style(div42, "max-height", "1364px");
    			attr_dev(div42, "data-aspect-ratio", "0.674");
    			attr_dev(div42, "data-min-width", "690");
    			attr_dev(div42, "data-max-width", "919");
    			add_location(div42, file, 405, 3, 20898);
    			set_style(div43, "padding", "0 0 100% 0");
    			add_location(div43, file, 425, 2, 22239);
    			attr_dev(img8, "id", "g-Korean-Waves-large-data-img");
    			attr_dev(img8, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img8, "alt", "");
    			if (!src_url_equal(img8.src, img8_src_value = "./images/Korean-Waves-large-data.png")) attr_dev(img8, "src", img8_src_value);
    			add_location(img8, file, 426, 4, 22284);
    			attr_dev(span3, "class", "g-cstyle0 svelte-12pf3up");
    			add_location(span3, file, 428, 26, 22566);
    			attr_dev(p36, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p36, file, 428, 5, 22545);
    			attr_dev(p37, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p37, file, 429, 5, 22618);
    			attr_dev(p38, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p38, file, 430, 5, 22657);
    			attr_dev(div44, "id", "g-ai28-1");
    			attr_dev(div44, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div44, "top", "19.2%");
    			set_style(div44, "margin-top", "-107.6px");
    			set_style(div44, "left", "50.0168%");
    			set_style(div44, "margin-left", "-269px");
    			set_style(div44, "width", "538px");
    			add_location(div44, file, 427, 4, 22396);
    			attr_dev(p39, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p39, file, 433, 5, 22842);
    			attr_dev(p40, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p40, file, 434, 5, 22886);
    			attr_dev(div45, "id", "g-ai28-2");
    			attr_dev(div45, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div45, "top", "41.7867%");
    			set_style(div45, "margin-top", "-42.4px");
    			set_style(div45, "left", "3.6724%");
    			set_style(div45, "width", "248px");
    			add_location(div45, file, 432, 4, 22711);
    			attr_dev(p41, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p41, file, 437, 5, 23063);
    			attr_dev(p42, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p42, file, 438, 5, 23107);
    			attr_dev(div46, "id", "g-ai28-3");
    			attr_dev(div46, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div46, "top", "41.7867%");
    			set_style(div46, "margin-top", "-42.4px");
    			set_style(div46, "right", "3.0703%");
    			set_style(div46, "width", "248px");
    			add_location(div46, file, 436, 4, 22931);
    			attr_dev(div47, "id", "g-Korean-Waves-large-data");
    			attr_dev(div47, "class", "g-artboard svelte-12pf3up");
    			set_style(div47, "min-width", "920px");
    			set_style(div47, "max-width", "1399px");
    			set_style(div47, "max-height", "1399px");
    			attr_dev(div47, "data-aspect-ratio", "1");
    			attr_dev(div47, "data-min-width", "920");
    			attr_dev(div47, "data-max-width", "1399");
    			add_location(div47, file, 424, 3, 22054);
    			set_style(div48, "padding", "0 0 56.25% 0");
    			add_location(div48, file, 444, 2, 23332);
    			attr_dev(img9, "id", "g-Korean-Waves-xlarge-data-img");
    			attr_dev(img9, "class", "g-aiImg svelte-12pf3up");
    			attr_dev(img9, "alt", "");
    			if (!src_url_equal(img9.src, img9_src_value = "./images/Korean-Waves-xlarge-data.png")) attr_dev(img9, "src", img9_src_value);
    			add_location(img9, file, 445, 4, 23379);
    			attr_dev(span4, "class", "g-cstyle0 svelte-12pf3up");
    			add_location(span4, file, 447, 31, 23672);
    			attr_dev(p43, "class", "g-pstyle0 svelte-12pf3up");
    			add_location(p43, file, 447, 5, 23646);
    			attr_dev(p44, "class", "g-pstyle1 svelte-12pf3up");
    			add_location(p44, file, 448, 5, 23728);
    			attr_dev(div49, "id", "g-ai29-1");
    			attr_dev(div49, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div49, "top", "12.6527%");
    			set_style(div49, "margin-top", "-71.6px");
    			set_style(div49, "left", "49.9925%");
    			set_style(div49, "margin-left", "-388.5px");
    			set_style(div49, "width", "777px");
    			add_location(div49, file, 446, 4, 23493);
    			attr_dev(p45, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p45, file, 451, 5, 23914);
    			attr_dev(p46, "class", "g-pstyle2 svelte-12pf3up");
    			add_location(p46, file, 452, 5, 23958);
    			attr_dev(div50, "id", "g-ai29-2");
    			attr_dev(div50, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div50, "top", "33.1737%");
    			set_style(div50, "margin-top", "-45.2px");
    			set_style(div50, "left", "17.3621%");
    			set_style(div50, "width", "265px");
    			add_location(div50, file, 450, 4, 23782);
    			attr_dev(p47, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p47, file, 455, 5, 24136);
    			attr_dev(p48, "class", "g-pstyle3 svelte-12pf3up");
    			add_location(p48, file, 456, 5, 24180);
    			attr_dev(div51, "id", "g-ai29-3");
    			attr_dev(div51, "class", "g-Layer_1 g-aiAbs g-aiPointText svelte-12pf3up");
    			set_style(div51, "top", "33.1737%");
    			set_style(div51, "margin-top", "-45.2px");
    			set_style(div51, "right", "16.8871%");
    			set_style(div51, "width", "265px");
    			add_location(div51, file, 454, 4, 24003);
    			attr_dev(div52, "id", "g-Korean-Waves-xlarge-data");
    			attr_dev(div52, "class", "g-artboard svelte-12pf3up");
    			set_style(div52, "min-width", "1400px");
    			attr_dev(div52, "data-aspect-ratio", "1.778");
    			attr_dev(div52, "data-min-width", "1400");
    			add_location(div52, file, 443, 3, 23198);
    			attr_dev(div53, "id", "g-Korean-Waves-box");
    			attr_dev(div53, "class", "ai2html svelte-12pf3up");
    			add_location(div53, file, 365, 1, 18503);
    			set_style(div_2, "display", "contents");
    			set_style(div_2, "--font-color", "#f9f9e1");
    			set_style(div_3, "display", "contents");
    			set_style(div_3, "--font-color", "#f9f9e1");
    			set_style(main, "background-color", /*mainBackground*/ ctx[7]);
    			add_location(main, file, 48, 0, 1288);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div25);
    			append_dev(div25, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, img0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, p0);
    			append_dev(div4, t3);
    			append_dev(div4, div2);
    			append_dev(div2, p1);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, p2);
    			append_dev(div25, t7);
    			append_dev(div25, div9);
    			append_dev(div9, div5);
    			append_dev(div9, t8);
    			append_dev(div9, img1);
    			append_dev(div9, t9);
    			append_dev(div9, div6);
    			append_dev(div6, p3);
    			append_dev(div9, t11);
    			append_dev(div9, div7);
    			append_dev(div7, p4);
    			append_dev(div9, t13);
    			append_dev(div9, div8);
    			append_dev(div8, p5);
    			append_dev(div25, t15);
    			append_dev(div25, div14);
    			append_dev(div14, div10);
    			append_dev(div14, t16);
    			append_dev(div14, img2);
    			append_dev(div14, t17);
    			append_dev(div14, div11);
    			append_dev(div11, p6);
    			append_dev(div14, t19);
    			append_dev(div14, div12);
    			append_dev(div12, p7);
    			append_dev(div14, t21);
    			append_dev(div14, div13);
    			append_dev(div13, p8);
    			append_dev(div25, t23);
    			append_dev(div25, div19);
    			append_dev(div19, div15);
    			append_dev(div19, t24);
    			append_dev(div19, img3);
    			append_dev(div19, t25);
    			append_dev(div19, div16);
    			append_dev(div16, p9);
    			append_dev(div19, t27);
    			append_dev(div19, div17);
    			append_dev(div17, p10);
    			append_dev(div19, t29);
    			append_dev(div19, div18);
    			append_dev(div18, p11);
    			append_dev(div25, t31);
    			append_dev(div25, div24);
    			append_dev(div24, div20);
    			append_dev(div24, t32);
    			append_dev(div24, img4);
    			append_dev(div24, t33);
    			append_dev(div24, div21);
    			append_dev(div21, p12);
    			append_dev(div24, t35);
    			append_dev(div24, div22);
    			append_dev(div22, p13);
    			append_dev(div24, t37);
    			append_dev(div24, div23);
    			append_dev(div23, p14);
    			append_dev(main, t39);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(main, t40);
    			append_dev(main, div26);
    			append_dev(main, t41);
    			mount_component(scroller, main, null);
    			append_dev(main, t42);
    			append_dev(main, div27);
    			append_dev(main, t43);
    			append_dev(main, div_1);
    			mount_component(paragraph0, div_1, null);
    			append_dev(main, t44);
    			append_dev(main, div53);
    			append_dev(div53, div32);
    			append_dev(div32, div28);
    			append_dev(div32, t45);
    			append_dev(div32, img5);
    			append_dev(div32, t46);
    			append_dev(div32, div29);
    			append_dev(div29, p15);
    			append_dev(p15, span0);
    			append_dev(p15, t48);
    			append_dev(div29, t49);
    			append_dev(div29, p16);
    			append_dev(div29, t51);
    			append_dev(div29, p17);
    			append_dev(div32, t53);
    			append_dev(div32, div30);
    			append_dev(div30, p18);
    			append_dev(div30, t55);
    			append_dev(div30, p19);
    			append_dev(div32, t57);
    			append_dev(div32, div31);
    			append_dev(div31, p20);
    			append_dev(div31, t59);
    			append_dev(div31, p21);
    			append_dev(div53, t61);
    			append_dev(div53, div37);
    			append_dev(div37, div33);
    			append_dev(div37, t62);
    			append_dev(div37, img6);
    			append_dev(div37, t63);
    			append_dev(div37, div34);
    			append_dev(div34, p22);
    			append_dev(p22, span1);
    			append_dev(p22, t65);
    			append_dev(div34, t66);
    			append_dev(div34, p23);
    			append_dev(div34, t68);
    			append_dev(div34, p24);
    			append_dev(div37, t70);
    			append_dev(div37, div35);
    			append_dev(div35, p25);
    			append_dev(div35, t72);
    			append_dev(div35, p26);
    			append_dev(div37, t74);
    			append_dev(div37, div36);
    			append_dev(div36, p27);
    			append_dev(div36, t76);
    			append_dev(div36, p28);
    			append_dev(div53, t78);
    			append_dev(div53, div42);
    			append_dev(div42, div38);
    			append_dev(div42, t79);
    			append_dev(div42, img7);
    			append_dev(div42, t80);
    			append_dev(div42, div39);
    			append_dev(div39, p29);
    			append_dev(p29, span2);
    			append_dev(p29, t82);
    			append_dev(div39, t83);
    			append_dev(div39, p30);
    			append_dev(div39, t85);
    			append_dev(div39, p31);
    			append_dev(div42, t87);
    			append_dev(div42, div40);
    			append_dev(div40, p32);
    			append_dev(div40, t89);
    			append_dev(div40, p33);
    			append_dev(div42, t91);
    			append_dev(div42, div41);
    			append_dev(div41, p34);
    			append_dev(div41, t93);
    			append_dev(div41, p35);
    			append_dev(div53, t95);
    			append_dev(div53, div47);
    			append_dev(div47, div43);
    			append_dev(div47, t96);
    			append_dev(div47, img8);
    			append_dev(div47, t97);
    			append_dev(div47, div44);
    			append_dev(div44, p36);
    			append_dev(p36, span3);
    			append_dev(p36, t99);
    			append_dev(div44, t100);
    			append_dev(div44, p37);
    			append_dev(div44, t102);
    			append_dev(div44, p38);
    			append_dev(div47, t104);
    			append_dev(div47, div45);
    			append_dev(div45, p39);
    			append_dev(div45, t106);
    			append_dev(div45, p40);
    			append_dev(div47, t108);
    			append_dev(div47, div46);
    			append_dev(div46, p41);
    			append_dev(div46, t110);
    			append_dev(div46, p42);
    			append_dev(div53, t112);
    			append_dev(div53, div52);
    			append_dev(div52, div48);
    			append_dev(div52, t113);
    			append_dev(div52, img9);
    			append_dev(div52, t114);
    			append_dev(div52, div49);
    			append_dev(div49, p43);
    			append_dev(p43, t115);
    			append_dev(p43, span4);
    			append_dev(p43, t117);
    			append_dev(div49, t118);
    			append_dev(div49, p44);
    			append_dev(div52, t120);
    			append_dev(div52, div50);
    			append_dev(div50, p45);
    			append_dev(div50, t122);
    			append_dev(div50, p46);
    			append_dev(div52, t124);
    			append_dev(div52, div51);
    			append_dev(div51, p47);
    			append_dev(div51, t126);
    			append_dev(div51, p48);
    			append_dev(main, t128);
    			append_dev(main, div_2);
    			mount_component(paragraph1, div_2, null);
    			append_dev(main, t129);
    			append_dev(main, div_3);
    			mount_component(credit_1, div_3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const scroller_changes = {};

    			if (dirty & /*$$scope, index*/ 524290) {
    				scroller_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_count && dirty & /*count*/ 1) {
    				updating_count = true;
    				scroller_changes.count = /*count*/ ctx[0];
    				add_flush_callback(() => updating_count = false);
    			}

    			if (!updating_index && dirty & /*index*/ 2) {
    				updating_index = true;
    				scroller_changes.index = /*index*/ ctx[1];
    				add_flush_callback(() => updating_index = false);
    			}

    			if (!updating_offset && dirty & /*offset*/ 4) {
    				updating_offset = true;
    				scroller_changes.offset = /*offset*/ ctx[2];
    				add_flush_callback(() => updating_offset = false);
    			}

    			if (!updating_progress && dirty & /*progress*/ 8) {
    				updating_progress = true;
    				scroller_changes.progress = /*progress*/ ctx[3];
    				add_flush_callback(() => updating_progress = false);
    			}

    			scroller.$set(scroller_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(scroller.$$.fragment, local);
    			transition_in(paragraph0.$$.fragment, local);
    			transition_in(paragraph1.$$.fragment, local);
    			transition_in(credit_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(scroller.$$.fragment, local);
    			transition_out(paragraph0.$$.fragment, local);
    			transition_out(paragraph1.$$.fragment, local);
    			transition_out(credit_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(scroller);
    			destroy_component(paragraph0);
    			destroy_component(paragraph1);
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
    	let count, index, offset, progress;
    	let top = 0;
    	let threshold = 0;
    	let bottom = 1;

    	// styling variables
    	let mainBackground = '#af3134';

    	let headerImage = 'url("https://rupadata.id/wp-content/uploads/2021/02/header-artikel-plta-kayan.jpg")';
    	let headerBackground = '#888';
    	let titleColor = '#f9f9e1';
    	let subtitleColor = '#f9f9e1';
    	let subheadColor = '#f9f9e1';

    	let credit = [
    		{ role: 'Penulis', name: 'Lorem Ipsum' },
    		{ role: 'Editor', name: 'Lorem Ipsum' },
    		{ role: 'Periset', name: 'Lorem Ipsum' }
    	];

    	let source = 'Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function scroller_count_binding(value) {
    		count = value;
    		$$invalidate(0, count);
    	}

    	function scroller_index_binding(value) {
    		index = value;
    		$$invalidate(1, index);
    	}

    	function scroller_offset_binding(value) {
    		offset = value;
    		$$invalidate(2, offset);
    	}

    	function scroller_progress_binding(value) {
    		progress = value;
    		$$invalidate(3, progress);
    	}

    	$$self.$capture_state = () => ({
    		Header,
    		Paragraph,
    		Quote,
    		Image,
    		Credit,
    		Scroller,
    		count,
    		index,
    		offset,
    		progress,
    		top,
    		threshold,
    		bottom,
    		mainBackground,
    		headerImage,
    		headerBackground,
    		titleColor,
    		subtitleColor,
    		subheadColor,
    		credit,
    		source
    	});

    	$$self.$inject_state = $$props => {
    		if ('count' in $$props) $$invalidate(0, count = $$props.count);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    		if ('offset' in $$props) $$invalidate(2, offset = $$props.offset);
    		if ('progress' in $$props) $$invalidate(3, progress = $$props.progress);
    		if ('top' in $$props) $$invalidate(4, top = $$props.top);
    		if ('threshold' in $$props) $$invalidate(5, threshold = $$props.threshold);
    		if ('bottom' in $$props) $$invalidate(6, bottom = $$props.bottom);
    		if ('mainBackground' in $$props) $$invalidate(7, mainBackground = $$props.mainBackground);
    		if ('headerImage' in $$props) $$invalidate(8, headerImage = $$props.headerImage);
    		if ('headerBackground' in $$props) $$invalidate(9, headerBackground = $$props.headerBackground);
    		if ('titleColor' in $$props) $$invalidate(10, titleColor = $$props.titleColor);
    		if ('subtitleColor' in $$props) $$invalidate(11, subtitleColor = $$props.subtitleColor);
    		if ('subheadColor' in $$props) $$invalidate(12, subheadColor = $$props.subheadColor);
    		if ('credit' in $$props) $$invalidate(13, credit = $$props.credit);
    		if ('source' in $$props) $$invalidate(14, source = $$props.source);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		count,
    		index,
    		offset,
    		progress,
    		top,
    		threshold,
    		bottom,
    		mainBackground,
    		headerImage,
    		headerBackground,
    		titleColor,
    		subtitleColor,
    		subheadColor,
    		credit,
    		source,
    		scroller_count_binding,
    		scroller_index_binding,
    		scroller_offset_binding,
    		scroller_progress_binding
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
