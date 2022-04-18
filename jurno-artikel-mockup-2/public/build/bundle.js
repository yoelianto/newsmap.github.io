
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
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
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

    /* src\Head.svelte generated by Svelte v3.46.4 */

    const file$8 = "src\\Head.svelte";

    function create_fragment$8(ctx) {
    	let nav;
    	let div1;
    	let div0;
    	let a;
    	let img;
    	let img_src_value;
    	let div1_resize_listener;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div1 = element("div");
    			div0 = element("div");
    			a = element("a");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "./images/logo-jurno-web.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Logo Jurno Website");
    			attr_dev(img, "class", "svelte-98yyk7");
    			add_location(img, file$8, 8, 16, 205);
    			attr_dev(a, "href", "https://dev.jurno.id");
    			add_location(a, file$8, 7, 12, 156);
    			attr_dev(div0, "class", "header-logo svelte-98yyk7");
    			add_location(div0, file$8, 6, 8, 117);
    			attr_dev(div1, "class", "container svelte-98yyk7");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[1].call(div1));
    			add_location(div1, file$8, 5, 4, 57);
    			attr_dev(nav, "class", "svelte-98yyk7");
    			add_location(nav, file$8, 4, 0, 46);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div1);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			append_dev(a, img);
    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[1].bind(div1));
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			div1_resize_listener();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Head', slots, []);
    	let { height } = $$props;
    	const writable_props = ['height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Head> was created with unknown prop '${key}'`);
    	});

    	function div1_elementresize_handler() {
    		height = this.clientHeight;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({ height });

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [height, div1_elementresize_handler];
    }

    class Head extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { height: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Head",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*height*/ ctx[0] === undefined && !('height' in props)) {
    			console.warn("<Head> was created without expected prop 'height'");
    		}
    	}

    	get height() {
    		throw new Error("<Head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Header.svelte generated by Svelte v3.46.4 */

    const file$7 = "src\\Header.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (26:0) {:else}
    function create_else_block(ctx) {
    	let section;
    	let div3;
    	let div0;
    	let t0;
    	let t1;
    	let aside;
    	let div1;
    	let t2;
    	let strong;
    	let t3;
    	let t4;
    	let div2;
    	let t5;
    	let t6;
    	let each_value_1 = /*subhead*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			aside = element("aside");
    			div1 = element("div");
    			t2 = text("Oleh ");
    			strong = element("strong");
    			t3 = text(/*author*/ ctx[3]);
    			t4 = space();
    			div2 = element("div");
    			t5 = text(/*date*/ ctx[4]);
    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "title svelte-1974078");
    			add_location(div0, file$7, 29, 12, 909);
    			add_location(strong, file$7, 32, 41, 1085);
    			attr_dev(div1, "class", "author");
    			add_location(div1, file$7, 32, 16, 1060);
    			attr_dev(div2, "class", "tanggal");
    			add_location(div2, file$7, 33, 16, 1136);
    			attr_dev(aside, "class", "credit svelte-1974078");
    			add_location(aside, file$7, 31, 12, 1020);
    			attr_dev(div3, "class", "title-section svelte-1974078");
    			add_location(div3, file$7, 28, 8, 868);
    			add_location(section, file$7, 26, 4, 847);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div0);
    			append_dev(div0, t0);
    			append_dev(div3, t1);
    			append_dev(div3, aside);
    			append_dev(aside, div1);
    			append_dev(div1, t2);
    			append_dev(div1, strong);
    			append_dev(strong, t3);
    			append_dev(aside, t4);
    			append_dev(aside, div2);
    			append_dev(div2, t5);
    			append_dev(div3, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*author*/ 8) set_data_dev(t3, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t5, /*date*/ ctx[4]);

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
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
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
    function create_if_block$1(ctx) {
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
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
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
    			attr_dev(div0, "class", "title svelte-1974078");
    			add_location(div0, file$7, 9, 16, 243);
    			attr_dev(div1, "class", "subtitle svelte-1974078");
    			add_location(div1, file$7, 10, 16, 295);
    			add_location(strong, file$7, 18, 45, 622);
    			attr_dev(div2, "class", "author");
    			add_location(div2, file$7, 18, 20, 597);
    			attr_dev(div3, "class", "tanggal");
    			add_location(div3, file$7, 19, 20, 677);
    			attr_dev(aside, "class", "credit svelte-1974078");
    			add_location(aside, file$7, 17, 16, 553);
    			attr_dev(div4, "class", "title-section svelte-1974078");
    			add_location(div4, file$7, 8, 12, 198);
    			attr_dev(div5, "class", "gradient svelte-1974078");
    			add_location(div5, file$7, 22, 12, 772);
    			attr_dev(div6, "class", "full-header-img svelte-1974078");
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
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(6:0) {#if fullHeader}",
    		ctx
    	});

    	return block;
    }

    // (36:12) {#each subhead as sub}
    function create_each_block_1(ctx) {
    	let div;
    	let t_value = /*sub*/ ctx[6] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "subhead svelte-1974078");
    			add_location(div, file$7, 36, 20, 1251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subhead*/ 4 && t_value !== (t_value = /*sub*/ ctx[6] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(36:12) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    // (12:16) {#each subhead as sub}
    function create_each_block$3(ctx) {
    	let div;
    	let p;
    	let t0_value = /*sub*/ ctx[6] + "";
    	let t0;
    	let t1;
    	let br;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			br = element("br");
    			add_location(p, file$7, 13, 24, 444);
    			attr_dev(div, "class", "subhead svelte-1974078");
    			add_location(div, file$7, 12, 20, 397);
    			add_location(br, file$7, 15, 20, 506);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subhead*/ 4 && t0_value !== (t0_value = /*sub*/ ctx[6] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(12:16) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
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

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each para as p}
    function create_each_block$2(ctx) {
    	let p;
    	let t_value = /*p*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-1o0jkfx");
    			add_location(p, file$6, 8, 8, 157);
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
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(8:4) {#each para as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section;
    	let each_value = /*para*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-1o0jkfx");
    			add_location(section, file$6, 5, 0, 79);
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { para: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$6.name
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

    const file$5 = "src\\Quote.svelte";

    function create_fragment$5(ctx) {
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
    			add_location(div0, file$5, 7, 12, 153);
    			attr_dev(img, "class", "quote-img svelte-1o0bngr");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*imgalt*/ ctx[1]);
    			add_location(img, file$5, 8, 12, 193);
    			attr_dev(div1, "class", "quote-pic svelte-1o0bngr");
    			add_location(div1, file$5, 6, 8, 116);
    			attr_dev(div2, "class", "quotes-tri svelte-1o0bngr");
    			add_location(div2, file$5, 12, 12, 322);
    			attr_dev(p, "class", "svelte-1o0bngr");
    			add_location(p, file$5, 14, 16, 404);
    			attr_dev(div3, "class", "quotes svelte-1o0bngr");
    			add_location(div3, file$5, 13, 12, 366);
    			attr_dev(span, "class", "quotes-bold svelte-1o0bngr");
    			add_location(span, file$5, 17, 16, 497);
    			attr_dev(div4, "class", "quote-name svelte-1o0bngr");
    			add_location(div4, file$5, 16, 12, 455);
    			attr_dev(div5, "class", "quotes-right svelte-1o0bngr");
    			add_location(div5, file$5, 11, 8, 282);
    			attr_dev(figure, "class", "svelte-1o0bngr");
    			add_location(figure, file$5, 5, 4, 98);
    			attr_dev(section, "class", "svelte-1o0bngr");
    			add_location(section, file$5, 4, 0, 83);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
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
    			id: create_fragment$5.name
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

    const file$4 = "src\\Image.svelte";

    function create_fragment$4(ctx) {
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
    			add_location(div0, file$4, 15, 2, 437);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-data-img");
    			attr_dev(img0, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-data.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$4, 16, 4, 486);
    			attr_dev(span0, "class", "g-cstyle0");
    			add_location(span0, file$4, 18, 26, 782);
    			attr_dev(p0, "class", "g-pstyle0");
    			add_location(p0, file$4, 18, 5, 761);
    			attr_dev(p1, "class", "g-pstyle1");
    			add_location(p1, file$4, 19, 5, 835);
    			attr_dev(p2, "class", "g-pstyle0");
    			add_location(p2, file$4, 20, 5, 875);
    			attr_dev(div1, "id", "g-ai25-1");
    			attr_dev(div1, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div1, "top", "34.0296%");
    			set_style(div1, "margin-top", "-57.2px");
    			set_style(div1, "left", "49.2184%");
    			set_style(div1, "margin-left", "-148.5px");
    			set_style(div1, "width", "297px");
    			add_location(div1, file$4, 17, 4, 607);
    			attr_dev(p3, "class", "g-pstyle2");
    			add_location(p3, file$4, 23, 5, 1061);
    			attr_dev(p4, "class", "g-pstyle2");
    			add_location(p4, file$4, 24, 5, 1106);
    			attr_dev(div2, "id", "g-ai25-2");
    			attr_dev(div2, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div2, "top", "51.464%");
    			set_style(div2, "margin-top", "-14.2px");
    			set_style(div2, "left", "4.6825%");
    			set_style(div2, "width", "99px");
    			add_location(div2, file$4, 22, 4, 931);
    			attr_dev(p5, "class", "g-pstyle3");
    			add_location(p5, file$4, 27, 5, 1284);
    			attr_dev(p6, "class", "g-pstyle3");
    			add_location(p6, file$4, 28, 5, 1329);
    			attr_dev(div3, "id", "g-ai25-3");
    			attr_dev(div3, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div3, "top", "51.464%");
    			set_style(div3, "margin-top", "-14.2px");
    			set_style(div3, "right", "4.0607%");
    			set_style(div3, "width", "99px");
    			add_location(div3, file$4, 26, 4, 1153);
    			attr_dev(div4, "id", "g-Korean-Waves-smallplus-data");
    			attr_dev(div4, "class", "g-artboard");
    			set_style(div4, "max-width", "509px");
    			set_style(div4, "max-height", "1113px");
    			attr_dev(div4, "data-aspect-ratio", "0.457");
    			attr_dev(div4, "data-min-width", "0");
    			attr_dev(div4, "data-max-width", "509");
    			add_location(div4, file$4, 14, 1, 264);
    			set_style(div5, "padding", "0 0 156.8627% 0");
    			add_location(div5, file$4, 34, 2, 1620);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-data-img");
    			attr_dev(img1, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-data.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$4, 35, 4, 1671);
    			attr_dev(span1, "class", "g-cstyle0");
    			add_location(span1, file$4, 37, 26, 1967);
    			attr_dev(p7, "class", "g-pstyle0");
    			add_location(p7, file$4, 37, 5, 1946);
    			attr_dev(p8, "class", "g-pstyle1");
    			add_location(p8, file$4, 38, 5, 2020);
    			attr_dev(p9, "class", "g-pstyle0");
    			add_location(p9, file$4, 39, 5, 2060);
    			attr_dev(div6, "id", "g-ai26-1");
    			attr_dev(div6, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div6, "top", "26.7684%");
    			set_style(div6, "margin-top", "-75.1px");
    			set_style(div6, "left", "50.0015%");
    			set_style(div6, "margin-left", "-191.5px");
    			set_style(div6, "width", "383px");
    			add_location(div6, file$4, 36, 4, 1792);
    			attr_dev(p10, "class", "g-pstyle2");
    			add_location(p10, file$4, 42, 5, 2248);
    			attr_dev(p11, "class", "g-pstyle2");
    			add_location(p11, file$4, 43, 5, 2293);
    			attr_dev(div7, "id", "g-ai26-2");
    			attr_dev(div7, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div7, "top", "50.2573%");
    			set_style(div7, "margin-top", "-23.1px");
    			set_style(div7, "left", "3.7282%");
    			set_style(div7, "width", "147px");
    			add_location(div7, file$4, 41, 4, 2116);
    			attr_dev(p12, "class", "g-pstyle3");
    			add_location(p12, file$4, 46, 5, 2473);
    			attr_dev(p13, "class", "g-pstyle3");
    			add_location(p13, file$4, 47, 5, 2518);
    			attr_dev(div8, "id", "g-ai26-3");
    			attr_dev(div8, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div8, "top", "50.2573%");
    			set_style(div8, "margin-top", "-23.1px");
    			set_style(div8, "right", "3.1528%");
    			set_style(div8, "width", "147px");
    			add_location(div8, file$4, 45, 4, 2340);
    			attr_dev(div9, "id", "g-Korean-Waves-submedium-data");
    			attr_dev(div9, "class", "g-artboard");
    			set_style(div9, "min-width", "510px");
    			set_style(div9, "max-width", "689px");
    			set_style(div9, "max-height", "1081px");
    			attr_dev(div9, "data-aspect-ratio", "0.638");
    			attr_dev(div9, "data-min-width", "510");
    			attr_dev(div9, "data-max-width", "689");
    			add_location(div9, file$4, 33, 3, 1428);
    			set_style(div10, "padding", "0 0 148.4058% 0");
    			add_location(div10, file$4, 53, 2, 2803);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-data-img");
    			attr_dev(img2, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-data.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$4, 54, 4, 2854);
    			attr_dev(span2, "class", "g-cstyle0");
    			add_location(span2, file$4, 56, 26, 3143);
    			attr_dev(p14, "class", "g-pstyle0");
    			add_location(p14, file$4, 56, 5, 3122);
    			attr_dev(p15, "class", "g-pstyle1");
    			add_location(p15, file$4, 57, 5, 3196);
    			attr_dev(p16, "class", "g-pstyle0");
    			add_location(p16, file$4, 58, 5, 3236);
    			attr_dev(div11, "id", "g-ai27-1");
    			attr_dev(div11, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div11, "top", "27.0156%");
    			set_style(div11, "margin-top", "-107.6px");
    			set_style(div11, "left", "50.0224%");
    			set_style(div11, "margin-left", "-269px");
    			set_style(div11, "width", "538px");
    			add_location(div11, file$4, 55, 4, 2969);
    			attr_dev(p17, "class", "g-pstyle2");
    			add_location(p17, file$4, 61, 5, 3424);
    			attr_dev(p18, "class", "g-pstyle2");
    			add_location(p18, file$4, 62, 5, 3469);
    			attr_dev(div12, "id", "g-ai27-2");
    			attr_dev(div12, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div12, "top", "49.5576%");
    			set_style(div12, "margin-top", "-31.5px");
    			set_style(div12, "left", "4.0423%");
    			set_style(div12, "width", "190px");
    			add_location(div12, file$4, 60, 4, 3292);
    			attr_dev(p19, "class", "g-pstyle3");
    			add_location(p19, file$4, 65, 5, 3649);
    			attr_dev(p20, "class", "g-pstyle3");
    			add_location(p20, file$4, 66, 5, 3694);
    			attr_dev(div13, "id", "g-ai27-3");
    			attr_dev(div13, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div13, "top", "49.5576%");
    			set_style(div13, "margin-top", "-31.5px");
    			set_style(div13, "right", "3.4664%");
    			set_style(div13, "width", "190px");
    			add_location(div13, file$4, 64, 4, 3516);
    			attr_dev(div14, "id", "g-Korean-Waves-medium-data");
    			attr_dev(div14, "class", "g-artboard");
    			set_style(div14, "min-width", "690px");
    			set_style(div14, "max-width", "919px");
    			set_style(div14, "max-height", "1364px");
    			attr_dev(div14, "data-aspect-ratio", "0.674");
    			attr_dev(div14, "data-min-width", "690");
    			attr_dev(div14, "data-max-width", "919");
    			add_location(div14, file$4, 52, 3, 2614);
    			set_style(div15, "padding", "0 0 100% 0");
    			add_location(div15, file$4, 72, 2, 3975);
    			attr_dev(img3, "id", "g-Korean-Waves-large-data-img");
    			attr_dev(img3, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-data.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$4, 73, 4, 4021);
    			attr_dev(span3, "class", "g-cstyle0");
    			add_location(span3, file$4, 75, 26, 4305);
    			attr_dev(p21, "class", "g-pstyle0");
    			add_location(p21, file$4, 75, 5, 4284);
    			attr_dev(p22, "class", "g-pstyle1");
    			add_location(p22, file$4, 76, 5, 4358);
    			attr_dev(p23, "class", "g-pstyle0");
    			add_location(p23, file$4, 77, 5, 4398);
    			attr_dev(div16, "id", "g-ai28-1");
    			attr_dev(div16, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div16, "top", "19.2%");
    			set_style(div16, "margin-top", "-107.6px");
    			set_style(div16, "left", "50.0168%");
    			set_style(div16, "margin-left", "-269px");
    			set_style(div16, "width", "538px");
    			add_location(div16, file$4, 74, 4, 4134);
    			attr_dev(p24, "class", "g-pstyle2");
    			add_location(p24, file$4, 80, 5, 4586);
    			attr_dev(p25, "class", "g-pstyle2");
    			add_location(p25, file$4, 81, 5, 4631);
    			attr_dev(div17, "id", "g-ai28-2");
    			attr_dev(div17, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div17, "top", "41.7867%");
    			set_style(div17, "margin-top", "-42.4px");
    			set_style(div17, "left", "3.6724%");
    			set_style(div17, "width", "248px");
    			add_location(div17, file$4, 79, 4, 4454);
    			attr_dev(p26, "class", "g-pstyle3");
    			add_location(p26, file$4, 84, 5, 4811);
    			attr_dev(p27, "class", "g-pstyle3");
    			add_location(p27, file$4, 85, 5, 4856);
    			attr_dev(div18, "id", "g-ai28-3");
    			attr_dev(div18, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div18, "top", "41.7867%");
    			set_style(div18, "margin-top", "-42.4px");
    			set_style(div18, "right", "3.0703%");
    			set_style(div18, "width", "248px");
    			add_location(div18, file$4, 83, 4, 4678);
    			attr_dev(div19, "id", "g-Korean-Waves-large-data");
    			attr_dev(div19, "class", "g-artboard");
    			set_style(div19, "min-width", "920px");
    			set_style(div19, "max-width", "1399px");
    			set_style(div19, "max-height", "1399px");
    			attr_dev(div19, "data-aspect-ratio", "1");
    			attr_dev(div19, "data-min-width", "920");
    			attr_dev(div19, "data-max-width", "1399");
    			add_location(div19, file$4, 71, 3, 3789);
    			set_style(div20, "padding", "0 0 56.25% 0");
    			add_location(div20, file$4, 91, 2, 5087);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-data-img");
    			attr_dev(img4, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-data.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$4, 92, 4, 5135);
    			attr_dev(span4, "class", "g-cstyle0");
    			add_location(span4, file$4, 94, 31, 5430);
    			attr_dev(p28, "class", "g-pstyle0");
    			add_location(p28, file$4, 94, 5, 5404);
    			attr_dev(p29, "class", "g-pstyle1");
    			add_location(p29, file$4, 95, 5, 5487);
    			attr_dev(div21, "id", "g-ai29-1");
    			attr_dev(div21, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div21, "top", "12.6527%");
    			set_style(div21, "margin-top", "-71.6px");
    			set_style(div21, "left", "49.9925%");
    			set_style(div21, "margin-left", "-388.5px");
    			set_style(div21, "width", "777px");
    			add_location(div21, file$4, 93, 4, 5250);
    			attr_dev(p30, "class", "g-pstyle2");
    			add_location(p30, file$4, 98, 5, 5676);
    			attr_dev(p31, "class", "g-pstyle2");
    			add_location(p31, file$4, 99, 5, 5721);
    			attr_dev(div22, "id", "g-ai29-2");
    			attr_dev(div22, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div22, "top", "33.1737%");
    			set_style(div22, "margin-top", "-45.2px");
    			set_style(div22, "left", "17.3621%");
    			set_style(div22, "width", "265px");
    			add_location(div22, file$4, 97, 4, 5543);
    			attr_dev(p32, "class", "g-pstyle3");
    			add_location(p32, file$4, 102, 5, 5902);
    			attr_dev(p33, "class", "g-pstyle3");
    			add_location(p33, file$4, 103, 5, 5947);
    			attr_dev(div23, "id", "g-ai29-3");
    			attr_dev(div23, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div23, "top", "33.1737%");
    			set_style(div23, "margin-top", "-45.2px");
    			set_style(div23, "right", "16.8871%");
    			set_style(div23, "width", "265px");
    			add_location(div23, file$4, 101, 4, 5768);
    			attr_dev(div24, "id", "g-Korean-Waves-xlarge-data");
    			attr_dev(div24, "class", "g-artboard");
    			set_style(div24, "min-width", "1400px");
    			attr_dev(div24, "data-aspect-ratio", "1.778");
    			attr_dev(div24, "data-min-width", "1400");
    			add_location(div24, file$4, 90, 3, 4952);
    			attr_dev(div25, "id", "g-Korean-Waves-box");
    			attr_dev(div25, "class", "ai2html");
    			add_location(div25, file$4, 12, 4, 179);
    			add_location(br, file$4, 114, 42, 6244);
    			attr_dev(div26, "class", "source svelte-125p5jy");
    			add_location(div26, file$4, 114, 8, 6210);
    			add_location(aside, file$4, 113, 4, 6193);
    			attr_dev(figure, "class", "svelte-125p5jy");
    			add_location(figure, file$4, 10, 0, 163);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { img: 2, imageTitle: 0, imageSource: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$4.name
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

    const file$3 = "src\\Credit.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (9:4) {#each credit as person}
    function create_each_block$1(ctx) {
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
    			attr_dev(div0, "class", "profpic svelte-zw5351");
    			add_location(div0, file$3, 10, 12, 205);
    			attr_dev(div1, "class", "role");
    			add_location(div1, file$3, 12, 16, 286);
    			attr_dev(div2, "class", "name svelte-zw5351");
    			add_location(div2, file$3, 13, 16, 343);
    			attr_dev(div3, "class", "profname svelte-zw5351");
    			add_location(div3, file$3, 11, 12, 246);
    			attr_dev(div4, "class", "profile svelte-zw5351");
    			attr_dev(div4, "id", "p1");
    			add_location(div4, file$3, 9, 8, 162);
    			attr_dev(div5, "class", "profile-bar svelte-zw5351");
    			add_location(div5, file$3, 16, 8, 427);
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
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:4) {#each credit as person}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
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
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
    			attr_dev(div, "class", "section-bar svelte-zw5351");
    			add_location(div, file$3, 7, 4, 91);
    			add_location(br0, file$3, 19, 4, 484);
    			add_location(br1, file$3, 20, 22, 512);
    			attr_dev(section, "class", "svelte-zw5351");
    			add_location(section, file$3, 6, 0, 76);
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
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { credit: 0, source: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Credit",
    			options,
    			id: create_fragment$3.name
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

    /* src\Foot.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\Foot.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (29:20) {#each data as d}
    function create_each_block(ctx) {
    	let a;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let p0;
    	let t1_value = /*d*/ ctx[1].author + "";
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = /*d*/ ctx[1].title + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			a = element("a");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(img, "class", "imgthumb svelte-jsdlg0");
    			if (!src_url_equal(img.src, img_src_value = /*d*/ ctx[1].origin_images)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*d*/ ctx[1].title);
    			add_location(img, file$2, 32, 32, 891);
    			attr_dev(div0, "class", "images svelte-jsdlg0");
    			add_location(div0, file$2, 31, 28, 837);
    			attr_dev(p0, "class", "author svelte-jsdlg0");
    			add_location(p0, file$2, 35, 32, 1071);
    			attr_dev(p1, "class", "article-title svelte-jsdlg0");
    			add_location(p1, file$2, 36, 32, 1137);
    			attr_dev(div1, "class", "credit");
    			add_location(div1, file$2, 34, 28, 1017);
    			attr_dev(div2, "class", "news svelte-jsdlg0");
    			add_location(div2, file$2, 30, 24, 789);
    			attr_dev(a, "href", /*d*/ ctx[1].source_url);
    			attr_dev(a, "class", "newspart svelte-jsdlg0");
    			add_location(a, file$2, 29, 20, 723);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p1);
    			append_dev(p1, t3);
    			append_dev(a, t4);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(29:20) {#each data as d}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let nav;
    	let div1;
    	let p;
    	let t1;
    	let div0;
    	let each_value = /*data*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "Artikel Populer";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "title svelte-jsdlg0");
    			add_location(p, file$2, 23, 8, 476);
    			attr_dev(div0, "class", "slider-container svelte-jsdlg0");
    			add_location(div0, file$2, 24, 8, 522);
    			attr_dev(div1, "class", "container svelte-jsdlg0");
    			add_location(div1, file$2, 22, 4, 443);
    			attr_dev(nav, "class", "svelte-jsdlg0");
    			add_location(nav, file$2, 21, 0, 432);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div1);
    			append_dev(div1, p);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
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
    			if (detaching) detach_dev(nav);
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
    	validate_slots('Foot', slots, []);

    	let data = [
    		{
    			title: 'Lorem Ipsum',
    			source_url: '',
    			origin_images: '',
    			author: 'Ann Putri'
    		},
    		{
    			title: 'Lorem Ipsum Dolor',
    			source_url: '',
    			origin_images: '',
    			author: 'Ahsan Ridhoi'
    		},
    		{
    			title: 'Sit Amet',
    			source_url: '',
    			origin_images: '',
    			author: 'Ann Putri'
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Foot> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ data });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Foot extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Foot",
    			options,
    			id: create_fragment$2.name
    		});
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

    // (460:24) 
    function create_if_block_9(ctx) {
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
    			add_location(div0, file, 464, 4, 25301);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-10-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-10.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 465, 4, 25349);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-10");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    				? /*offset*/ ctx[2]
    				: 1,
    				false
    			);

    			add_location(div1, file, 462, 4, 25071);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 471, 4, 25756);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-10-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-10.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 472, 4, 25806);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-10");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    				? /*offset*/ ctx[2]
    				: 1,
    				false
    			);

    			add_location(div3, file, 469, 4, 25507);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 478, 4, 26207);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-10-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-10.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 479, 4, 26257);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-10");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    				? /*offset*/ ctx[2]
    				: 1,
    				false
    			);

    			add_location(div5, file, 476, 4, 25961);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 485, 4, 26648);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-10-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-10.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 486, 4, 26693);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-10");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    				? /*offset*/ ctx[2]
    				: 1,
    				false
    			);

    			add_location(div7, file, 483, 4, 26405);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 492, 4, 27032);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-10-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-10.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 493, 4, 27079);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-10");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    				? /*offset*/ ctx[2]
    				: 1,
    				false
    			);

    			add_location(div9, file, 490, 4, 26840);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset, index*/ 6) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    					? /*offset*/ ctx[2]
    					: 1,
    					false
    				);
    			}

    			if (dirty & /*offset, index*/ 6) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    					? /*offset*/ ctx[2]
    					: 1,
    					false
    				);
    			}

    			if (dirty & /*offset, index*/ 6) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    					? /*offset*/ ctx[2]
    					: 1,
    					false
    				);
    			}

    			if (dirty & /*offset, index*/ 6) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    					? /*offset*/ ctx[2]
    					: 1,
    					false
    				);
    			}

    			if (dirty & /*offset, index*/ 6) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2 && /*index*/ ctx[1] == 9
    					? /*offset*/ ctx[2]
    					: 1,
    					false
    				);
    			}
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
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(460:24) ",
    		ctx
    	});

    	return block;
    }

    // (424:24) 
    function create_if_block_8(ctx) {
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
    			add_location(div0, file, 428, 4, 23051);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-9-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-9.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 429, 4, 23099);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-9");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 426, 4, 22807);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 435, 4, 23517);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-9-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-9.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 436, 4, 23567);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-9");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 433, 4, 23254);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 442, 4, 23979);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-9-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-9.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 443, 4, 24029);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-9");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 440, 4, 23719);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 449, 4, 24431);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-9-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-9.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 450, 4, 24476);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-9");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 447, 4, 24174);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 456, 4, 24826);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-9-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-9.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 457, 4, 24873);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-9");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 454, 4, 24620);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(424:24) ",
    		ctx
    	});

    	return block;
    }

    // (388:24) 
    function create_if_block_7(ctx) {
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
    			add_location(div0, file, 392, 4, 20789);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-8-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-8.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 393, 4, 20837);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-8");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 390, 4, 20545);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 399, 4, 21255);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-8-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-8.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 400, 4, 21305);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-8");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 397, 4, 20992);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 406, 4, 21717);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-8-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-8.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 407, 4, 21767);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-8");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 404, 4, 21457);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 413, 4, 22169);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-8-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-8.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 414, 4, 22214);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-8");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 411, 4, 21912);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 420, 4, 22564);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-8-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-8.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 421, 4, 22611);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-8");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 418, 4, 22358);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(388:24) ",
    		ctx
    	});

    	return block;
    }

    // (352:24) 
    function create_if_block_6(ctx) {
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
    			add_location(div0, file, 356, 4, 18527);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-7-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-7.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 357, 4, 18575);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-7");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 354, 4, 18283);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 363, 4, 18993);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-7-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-7.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 364, 4, 19043);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-7");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 361, 4, 18730);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 370, 4, 19455);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-7-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-7.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 371, 4, 19505);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-7");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 368, 4, 19195);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 377, 4, 19907);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-7-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-7.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 378, 4, 19952);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-7");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 375, 4, 19650);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 384, 4, 20302);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-7-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-7.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 385, 4, 20349);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-7");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 382, 4, 20096);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(352:24) ",
    		ctx
    	});

    	return block;
    }

    // (316:24) 
    function create_if_block_5(ctx) {
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
    			add_location(div0, file, 320, 4, 16265);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-6-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-6.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 321, 4, 16313);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-6");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 318, 4, 16021);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 327, 4, 16731);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-6-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-6.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 328, 4, 16781);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-6");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 325, 4, 16468);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 334, 4, 17193);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-6-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-6.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 335, 4, 17243);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-6");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 332, 4, 16933);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 341, 4, 17645);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-6-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-6.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 342, 4, 17690);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-6");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 339, 4, 17388);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 348, 4, 18040);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-6-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-6.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 349, 4, 18087);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-6");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 346, 4, 17834);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(316:24) ",
    		ctx
    	});

    	return block;
    }

    // (278:24) 
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
    			add_location(div0, file, 282, 4, 13998);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-5-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-5.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 283, 4, 14046);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-5");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 280, 4, 13754);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 289, 4, 14464);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-5-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-5.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 290, 4, 14514);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-5");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 287, 4, 14201);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 296, 4, 14926);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-5-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-5.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 297, 4, 14976);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-5");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 294, 4, 14666);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 303, 4, 15378);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-5-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-5.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 304, 4, 15423);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-5");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 301, 4, 15121);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 310, 4, 15773);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-5-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-5.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 311, 4, 15820);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-5");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 308, 4, 15567);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		source: "(278:24) ",
    		ctx
    	});

    	return block;
    }

    // (241:24) 
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
    			add_location(div0, file, 245, 4, 11732);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-4-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-4.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 246, 4, 11780);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-4");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 243, 4, 11488);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 252, 4, 12198);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-4-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-4.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 253, 4, 12248);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-4");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 250, 4, 11935);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 259, 4, 12660);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-4-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-4.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 260, 4, 12710);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-4");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 257, 4, 12400);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 266, 4, 13112);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-4-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-4.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 267, 4, 13157);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-4");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 264, 4, 12855);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 273, 4, 13507);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-4-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-4.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 274, 4, 13554);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-4");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 271, 4, 13301);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		source: "(241:24) ",
    		ctx
    	});

    	return block;
    }

    // (203:24) 
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
    			add_location(div0, file, 207, 4, 9468);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-3-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-3.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 208, 4, 9516);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-3");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 205, 4, 9224);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 214, 4, 9934);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-3-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-3.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 215, 4, 9984);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-3");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 212, 4, 9671);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 221, 4, 10396);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-3-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-3.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 222, 4, 10446);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-3");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 219, 4, 10136);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 228, 4, 10848);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-3-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-3.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 229, 4, 10893);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-3");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 226, 4, 10591);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 235, 4, 11243);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-3-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-3.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 236, 4, 11290);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-3");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 233, 4, 11037);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		source: "(203:24) ",
    		ctx
    	});

    	return block;
    }

    // (165:24) 
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
    			add_location(div0, file, 169, 4, 7204);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-2-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-2.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 170, 4, 7252);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-2");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 167, 4, 6960);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 176, 4, 7670);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-2-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-2.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 177, 4, 7720);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-2");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 174, 4, 7407);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 183, 4, 8132);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-2-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-2.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 184, 4, 8182);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-2");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 181, 4, 7872);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 190, 4, 8584);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-2-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-2.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 191, 4, 8629);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-2");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 188, 4, 8327);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 197, 4, 8979);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-2-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-2.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 198, 4, 9026);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-2");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 195, 4, 8773);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		source: "(165:24) ",
    		ctx
    	});

    	return block;
    }

    // (127:3) {#if index == 0}
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
    			add_location(div0, file, 131, 4, 4940);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-1-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-1.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 132, 4, 4988);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-1");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "1113px");
    			attr_dev(div1, "data-aspect-ratio", "0.457");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");

    			set_style(
    				div1,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div1, file, 129, 4, 4696);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 138, 4, 5406);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-1-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-1.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 139, 4, 5456);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-1");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "1081px");
    			attr_dev(div3, "data-aspect-ratio", "0.638");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");

    			set_style(
    				div3,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div3, file, 136, 4, 5143);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 145, 4, 5868);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-1-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-1.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 146, 4, 5918);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-1");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "1364px");
    			attr_dev(div5, "data-aspect-ratio", "0.674");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");

    			set_style(
    				div5,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div5, file, 143, 4, 5608);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 152, 4, 6320);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-1-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-1.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 153, 4, 6365);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-1");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "1399px");
    			attr_dev(div7, "data-aspect-ratio", "1");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");

    			set_style(
    				div7,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div7, file, 150, 4, 6063);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 159, 4, 6715);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-1-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-1.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 160, 4, 6762);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-1");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "1.778");
    			attr_dev(div9, "data-min-width", "1400");

    			set_style(
    				div9,
    				"opacity",
    				/*offset*/ ctx[2] <= 0.2
    				? /*offset*/ ctx[2]
    				: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    				false
    			);

    			add_location(div9, file, 157, 4, 6509);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div1,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div3,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div5,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div7,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}

    			if (dirty & /*offset*/ 4) {
    				set_style(
    					div9,
    					"opacity",
    					/*offset*/ ctx[2] <= 0.2
    					? /*offset*/ ctx[2]
    					: /*offset*/ ctx[2] <= 0.8 ? 1 : 1 - /*offset*/ ctx[2],
    					false
    				);
    			}
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
    		source: "(127:3) {#if index == 0}",
    		ctx
    	});

    	return block;
    }

    // (124:2) 
    function create_background_slot(ctx) {
    	let div1;
    	let div0;

    	function select_block_type(ctx, dirty) {
    		if (/*index*/ ctx[1] == 0) return create_if_block;
    		if (/*index*/ ctx[1] == 1) return create_if_block_1;
    		if (/*index*/ ctx[1] == 2) return create_if_block_2;
    		if (/*index*/ ctx[1] == 3) return create_if_block_3;
    		if (/*index*/ ctx[1] == 4) return create_if_block_4;
    		if (/*index*/ ctx[1] == 5) return create_if_block_5;
    		if (/*index*/ ctx[1] == 6) return create_if_block_6;
    		if (/*index*/ ctx[1] == 7) return create_if_block_7;
    		if (/*index*/ ctx[1] == 8) return create_if_block_8;
    		if (/*index*/ ctx[1] >= 9) return create_if_block_9;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "id", "g-Bisa-Ular-box");
    			attr_dev(div0, "class", "ai2html svelte-c8c1aj");
    			add_location(div0, file, 124, 3, 4570);
    			attr_dev(div1, "slot", "background");
    			attr_dev(div1, "class", "svelte-c8c1aj");
    			add_location(div1, file, 123, 2, 4543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			if (if_block) if_block.m(div0, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
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
    		source: "(124:2) ",
    		ctx
    	});

    	return block;
    }

    // (500:2) 
    function create_foreground_slot(ctx) {
    	let div;
    	let section0;
    	let t0;
    	let section1;
    	let p0;
    	let t2;
    	let section2;
    	let p1;
    	let t3;
    	let em0;
    	let t5;
    	let em1;
    	let t7;
    	let t8;
    	let section3;
    	let p2;
    	let t10;
    	let section4;
    	let p3;
    	let t12;
    	let section5;
    	let p4;
    	let t14;
    	let section6;
    	let p5;
    	let t16;
    	let section7;
    	let p6;
    	let t18;
    	let section8;
    	let p7;
    	let t20;
    	let section9;
    	let p8;
    	let t22;
    	let section10;
    	let p9;

    	const block = {
    		c: function create() {
    			div = element("div");
    			section0 = element("section");
    			t0 = space();
    			section1 = element("section");
    			p0 = element("p");
    			p0.textContent = "Lima hari sebelum ulang tahunnya yang ke-13, pada Januari 2020, Martinus menggembala sapi-sapi ternaknya di sebuah ladang di Kabupaten Lembata, Nusa Tenggara Timur (NTT).";
    			t2 = space();
    			section2 = element("section");
    			p1 = element("p");
    			t3 = text("Namun, a menginjak dan digigit seekor ular berbisa langka bernama ilmiah ");
    			em0 = element("em");
    			em0.textContent = "daboia ruselli siamensis";
    			t5 = text(" . Ular ini termasuk golongan ");
    			em1 = element("em");
    			em1.textContent = "viperia ruselli";
    			t7 = text(" yang hanya hidup di beberapa wilayah Indonesia Tengah, antara lain Pulau Flores, Pulau Komodo, NTT, Adonara, Ende, dan Pulau Solor.");
    			t8 = space();
    			section3 = element("section");
    			p2 = element("p");
    			p2.textContent = "Dalam hitungan jam setelah terkena gigitan, ia mengalami gagal ginjal, kegagalan pernapasan, dan pendarahan di hampir semua organ tubuhnya. Dengan kata lain, nyawanya sedang di ujung tanduk.";
    			t10 = space();
    			section4 = element("section");
    			p3 = element("p");
    			p3.textContent = "Kabar tersebut sampai kepada Tri Maharani pada 14 Januari 2020, doktor lulusan Universitas Brawijaya Malang yang menjabat sebagai Presiden Indonesia Toksinologi.";
    			t12 = space();
    			section5 = element("section");
    			p4 = element("p");
    			p4.textContent = "Dalam kondisi semacam itu, menurut Maha, pasien harus mendapatkan antivenom atau anti bisa ular yang tepat. Masalahnya, antivenom untuk daboia ruselli siamensis tak tersedia di Indonesia. Kementerian Kesehatan dan PT Bio Farma pun tak bisa menyanggupi menyediakannya untuk keperluan penyembuhan Martinus.";
    			t14 = space();
    			section6 = element("section");
    			p5 = element("p");
    			p5.textContent = "Mujur, sekali lagi, masih berkawan dengan Martinus. Maha memiliki koneksi khusus dengan salah satu profesor yang menangani gigitan ular berbisa dari Queen Sabovana Memorial Institute Thailand.";
    			t16 = space();
    			section7 = element("section");
    			p6 = element("p");
    			p6.textContent = "Profesor tersebut menyanggupi membantu Maha mendapatkan antivenom untuk mengobati Martinus. Keesokan harinya, Maha langsung terbang ke Bangkok, Thailand dan bertemu profesor tersebut. Ia membeli 12 vial antivenom untuk ular daboia ruselli siamensis melalui perantara kenalannya itu. Harga per vialnya mencapai ratusan dollar Amerika Serikat. Semua ia beli dengan uang pribadi.";
    			t18 = space();
    			section8 = element("section");
    			p7 = element("p");
    			p7.textContent = "Usai mendapat antivenom tersebut, Maha langsung berangkat ke Lembata. Lantaran tak ada pesawat yang langsung menuju Lembata, ia mesti transit terlebih dulu sehari di Surabaya untuk kemudian terbang menuju Kupang. Dari Kupang, ia melakukan perjalanan darat ke Lembata.";
    			t20 = space();
    			section9 = element("section");
    			p8 = element("p");
    			p8.textContent = "Maha tiba di Lembata pada hari kelima usai Martinus tergigit ular. Ia langsung menyuntikkan antivenom tersebut ke tubuh Martinus dan mengawasi langsung perkembangan kesehatannya selama lebih kurang 12 jam.";
    			t22 = space();
    			section10 = element("section");
    			p9 = element("p");
    			p9.textContent = "Tepat pukul 12 malam hari itu, saat usia Martinus resmi bertambah, kondisinya membaik. Pendarahan di organ-organ penting mulai berhenti. Ginjalnya pun membaik. Kini, ia telah sembuh dan menjalani hidup normal kembali.";
    			attr_dev(section0, "class", "svelte-c8c1aj");
    			add_location(section0, file, 500, 3, 27249);
    			attr_dev(p0, "class", "svelte-c8c1aj");
    			add_location(p0, file, 502, 4, 27286);
    			attr_dev(section1, "class", "svelte-c8c1aj");
    			add_location(section1, file, 501, 3, 27272);
    			add_location(em0, file, 508, 78, 27588);
    			add_location(em1, file, 508, 141, 27651);
    			attr_dev(p1, "class", "svelte-c8c1aj");
    			add_location(p1, file, 507, 4, 27506);
    			attr_dev(section2, "class", "svelte-c8c1aj");
    			add_location(section2, file, 506, 3, 27492);
    			attr_dev(p2, "class", "svelte-c8c1aj");
    			add_location(p2, file, 512, 4, 27848);
    			attr_dev(section3, "class", "svelte-c8c1aj");
    			add_location(section3, file, 511, 3, 27834);
    			attr_dev(p3, "class", "svelte-c8c1aj");
    			add_location(p3, file, 517, 4, 28088);
    			attr_dev(section4, "class", "svelte-c8c1aj");
    			add_location(section4, file, 516, 3, 28074);
    			attr_dev(p4, "class", "svelte-c8c1aj");
    			add_location(p4, file, 522, 4, 28299);
    			attr_dev(section5, "class", "svelte-c8c1aj");
    			add_location(section5, file, 521, 3, 28285);
    			attr_dev(p5, "class", "svelte-c8c1aj");
    			add_location(p5, file, 527, 4, 28655);
    			attr_dev(section6, "class", "svelte-c8c1aj");
    			add_location(section6, file, 526, 3, 28641);
    			attr_dev(p6, "class", "svelte-c8c1aj");
    			add_location(p6, file, 532, 4, 28897);
    			attr_dev(section7, "class", "svelte-c8c1aj");
    			add_location(section7, file, 531, 3, 28883);
    			attr_dev(p7, "class", "svelte-c8c1aj");
    			add_location(p7, file, 537, 4, 29324);
    			attr_dev(section8, "class", "svelte-c8c1aj");
    			add_location(section8, file, 536, 3, 29310);
    			attr_dev(p8, "class", "svelte-c8c1aj");
    			add_location(p8, file, 542, 4, 29641);
    			attr_dev(section9, "class", "svelte-c8c1aj");
    			add_location(section9, file, 541, 3, 29627);
    			attr_dev(p9, "class", "svelte-c8c1aj");
    			add_location(p9, file, 547, 4, 29896);
    			attr_dev(section10, "class", "svelte-c8c1aj");
    			add_location(section10, file, 546, 3, 29882);
    			attr_dev(div, "slot", "foreground");
    			attr_dev(div, "class", "svelte-c8c1aj");
    			add_location(div, file, 499, 2, 27221);
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
    			append_dev(p1, t3);
    			append_dev(p1, em0);
    			append_dev(p1, t5);
    			append_dev(p1, em1);
    			append_dev(p1, t7);
    			append_dev(div, t8);
    			append_dev(div, section3);
    			append_dev(section3, p2);
    			append_dev(div, t10);
    			append_dev(div, section4);
    			append_dev(section4, p3);
    			append_dev(div, t12);
    			append_dev(div, section5);
    			append_dev(section5, p4);
    			append_dev(div, t14);
    			append_dev(div, section6);
    			append_dev(section6, p5);
    			append_dev(div, t16);
    			append_dev(div, section7);
    			append_dev(section7, p6);
    			append_dev(div, t18);
    			append_dev(div, section8);
    			append_dev(section8, p7);
    			append_dev(div, t20);
    			append_dev(div, section9);
    			append_dev(section9, p8);
    			append_dev(div, t22);
    			append_dev(div, section10);
    			append_dev(section10, p9);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_foreground_slot.name,
    		type: "slot",
    		source: "(500:2) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link0;
    	let link1;
    	let link2;
    	let t0;
    	let main;
    	let head;
    	let updating_height;
    	let t1;
    	let div11;
    	let div10;
    	let div1;
    	let div0;
    	let t2;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let div3;
    	let div2;
    	let t4;
    	let img1;
    	let img1_src_value;
    	let t5;
    	let div5;
    	let div4;
    	let t6;
    	let img2;
    	let img2_src_value;
    	let t7;
    	let div7;
    	let div6;
    	let t8;
    	let img3;
    	let img3_src_value;
    	let t9;
    	let div9;
    	let div8;
    	let t10;
    	let img4;
    	let img4_src_value;
    	let t11;
    	let header;
    	let div;
    	let t12;
    	let div12;
    	let t13;
    	let scroller;
    	let updating_count;
    	let updating_index;
    	let updating_offset;
    	let updating_progress;
    	let t14;
    	let div13;
    	let t15;
    	let paragraph;
    	let div_1;
    	let t16;
    	let credit_1;
    	let div_2;
    	let t17;
    	let foot;
    	let div_3;
    	let current;

    	function head_height_binding(value) {
    		/*head_height_binding*/ ctx[19](value);
    	}

    	let head_props = {};

    	if (/*height*/ ctx[4] !== void 0) {
    		head_props.height = /*height*/ ctx[4];
    	}

    	head = new Head({ props: head_props, $$inline: true });
    	binding_callbacks.push(() => bind(head, 'height', head_height_binding));

    	header = new Header({
    			props: {
    				fullHeader: false,
    				title: "Bisa Ular",
    				subhead: /*subhead*/ ctx[16],
    				author: "Ahsan Ridhoi",
    				date: ""
    			},
    			$$inline: true
    		});

    	function scroller_count_binding(value) {
    		/*scroller_count_binding*/ ctx[20](value);
    	}

    	function scroller_index_binding(value) {
    		/*scroller_index_binding*/ ctx[21](value);
    	}

    	function scroller_offset_binding(value) {
    		/*scroller_offset_binding*/ ctx[22](value);
    	}

    	function scroller_progress_binding(value) {
    		/*scroller_progress_binding*/ ctx[23](value);
    	}

    	let scroller_props = {
    		top: /*top*/ ctx[8],
    		threshold: /*threshold*/ ctx[9],
    		bottom: /*bottom*/ ctx[10],
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

    	paragraph = new Paragraph({
    			props: {
    				para: [
    					'Kelangkaan antivenom di Indonesia cukup mengkhawatirkan jika dibandingkan dengan jumlah kasus tahunan gigitan ular berbisa. Sepanjang sepuluh tahun ke belakang, berdasarkan laporan dari rumah sakit dan fasilitas Kesehatan lain, Maha mencatat sebanyak 135 ribu kasus gigitan ular di Indonesia per tahun.',
    					'Dari jumlah kasus tersebut, rasio kematian korban mencapai 10% atau lebih 13.500 orang. Angka tersebut jauh dari standar Organisasi Kesehatan Dunia (WHO) bahwa rasio kematian maksimal di suatu wilayah adalah 2%.',
    					'Data tersebut sebetulnya tak bisa menjadi gambaran utuh atas kasus gigitan ular di Indonesia. Pasalnya, tak ada catatan resmi dari pemerintah terkait persoalan kesehatan serius ini. Maka, menurut Maha, bisa jadi jumlah kasus dan kematian lebih dari angka tersebut.'
    				]
    			},
    			$$inline: true
    		});

    	credit_1 = new Credit({
    			props: {
    				source: /*source*/ ctx[18],
    				credit: /*credit*/ ctx[17]
    			},
    			$$inline: true
    		});

    	foot = new Foot({ $$inline: true });

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(head.$$.fragment);
    			t1 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t2 = space();
    			img0 = element("img");
    			t3 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t4 = space();
    			img1 = element("img");
    			t5 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t6 = space();
    			img2 = element("img");
    			t7 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t8 = space();
    			img3 = element("img");
    			t9 = space();
    			div9 = element("div");
    			div8 = element("div");
    			t10 = space();
    			img4 = element("img");
    			t11 = space();
    			div = element("div");
    			create_component(header.$$.fragment);
    			t12 = space();
    			div12 = element("div");
    			t13 = space();
    			create_component(scroller.$$.fragment);
    			t14 = space();
    			div13 = element("div");
    			t15 = space();
    			div_1 = element("div");
    			create_component(paragraph.$$.fragment);
    			t16 = space();
    			div_2 = element("div");
    			create_component(credit_1.$$.fragment);
    			t17 = space();
    			div_3 = element("div");
    			create_component(foot.$$.fragment);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file, 51, 1, 1784);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			attr_dev(link1, "crossorigin", "");
    			add_location(link1, file, 52, 1, 1845);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file, 53, 1, 1915);
    			set_style(div0, "padding", "0 0 100% 0");
    			add_location(div0, file, 64, 3, 2437);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-cover-img");
    			attr_dev(img0, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-cover.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 65, 3, 2481);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-cover");
    			attr_dev(div1, "class", "g-artboard svelte-c8c1aj");
    			set_style(div1, "max-width", "509px");
    			set_style(div1, "max-height", "509px");
    			attr_dev(div1, "data-aspect-ratio", "1");
    			attr_dev(div1, "data-min-width", "0");
    			attr_dev(div1, "data-max-width", "509");
    			add_location(div1, file, 63, 3, 2271);
    			set_style(div2, "padding", "0 0 62.7451% 0");
    			add_location(div2, file, 70, 3, 2838);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-cover-img");
    			attr_dev(img1, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-cover.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 71, 3, 2886);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-cover");
    			attr_dev(div3, "class", "g-artboard svelte-c8c1aj");
    			set_style(div3, "min-width", "510px");
    			set_style(div3, "max-width", "689px");
    			set_style(div3, "max-height", "432px");
    			attr_dev(div3, "data-aspect-ratio", "1.594");
    			attr_dev(div3, "data-min-width", "510");
    			attr_dev(div3, "data-max-width", "689");
    			add_location(div3, file, 69, 3, 2649);
    			set_style(div4, "padding", "0 0 46.3768% 0");
    			add_location(div4, file, 76, 3, 3237);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-cover-img");
    			attr_dev(img2, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-cover.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 77, 3, 3285);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-cover");
    			attr_dev(div5, "class", "g-artboard svelte-c8c1aj");
    			set_style(div5, "min-width", "690px");
    			set_style(div5, "max-width", "919px");
    			set_style(div5, "max-height", "426px");
    			attr_dev(div5, "data-aspect-ratio", "2.156");
    			attr_dev(div5, "data-min-width", "690");
    			attr_dev(div5, "data-max-width", "919");
    			add_location(div5, file, 75, 3, 3051);
    			set_style(div6, "padding", "0 0 34.6739% 0");
    			add_location(div6, file, 82, 3, 3630);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-cover-img");
    			attr_dev(img3, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-cover.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 83, 4, 3679);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-cover");
    			attr_dev(div7, "class", "g-artboard svelte-c8c1aj");
    			set_style(div7, "min-width", "920px");
    			set_style(div7, "max-width", "1399px");
    			set_style(div7, "max-height", "485px");
    			attr_dev(div7, "data-aspect-ratio", "2.884");
    			attr_dev(div7, "data-min-width", "920");
    			attr_dev(div7, "data-max-width", "1399");
    			add_location(div7, file, 81, 3, 3443);
    			set_style(div8, "padding", "0 0 22.3929% 0");
    			add_location(div8, file, 88, 3, 3969);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-cover-img");
    			attr_dev(img4, "class", "g-aiImg svelte-c8c1aj");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-cover.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 89, 4, 4018);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-cover");
    			attr_dev(div9, "class", "g-artboard svelte-c8c1aj");
    			set_style(div9, "min-width", "1400px");
    			attr_dev(div9, "data-aspect-ratio", "4.466");
    			attr_dev(div9, "data-min-width", "1400");
    			add_location(div9, file, 87, 3, 3836);
    			attr_dev(div10, "id", "g-Bisa-Ular-box");
    			attr_dev(div10, "class", "ai2html svelte-c8c1aj");
    			add_location(div10, file, 61, 2, 2187);
    			attr_dev(div11, "class", "headerilustrasi");
    			set_style(div11, "margin-top", /*height*/ ctx[4] + "px");
    			add_location(div11, file, 60, 1, 2124);
    			set_style(div, "display", "contents");
    			set_style(div, "--headerBackground", /*headerBackground*/ ctx[12]);
    			set_style(div, "--titleColor", /*titleColor*/ ctx[13]);
    			set_style(div, "--subtitleColor", /*subtitleColor*/ ctx[14]);
    			set_style(div, "--subheadColor", /*subheadColor*/ ctx[15]);
    			attr_dev(div12, "class", "divider svelte-c8c1aj");
    			add_location(div12, file, 112, 1, 4409);
    			attr_dev(div13, "class", "divider svelte-c8c1aj");
    			add_location(div13, file, 554, 1, 30170);
    			set_style(div_1, "display", "contents");
    			set_style(div_1, "--font-color", "#f9f9e1");
    			set_style(div_2, "display", "contents");
    			set_style(div_2, "--fontfamily1", /*fontfamily1*/ ctx[5]);
    			set_style(div_2, "--font-color", /*fontColor*/ ctx[6]);
    			set_style(div_3, "display", "contents");
    			set_style(div_3, "--fontfamily1", /*fontfamily1*/ ctx[5]);
    			set_style(div_3, "--font-color", /*fontColor*/ ctx[6]);
    			set_style(div_3, "--bgColorDark", /*colorBrandDarkBlue*/ ctx[7]);
    			set_style(main, "background-color", /*mainBackground*/ ctx[11]);
    			add_location(main, file, 56, 0, 2036);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(head, main, null);
    			append_dev(main, t1);
    			append_dev(main, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    			append_dev(div1, img0);
    			append_dev(div10, t3);
    			append_dev(div10, div3);
    			append_dev(div3, div2);
    			append_dev(div3, t4);
    			append_dev(div3, img1);
    			append_dev(div10, t5);
    			append_dev(div10, div5);
    			append_dev(div5, div4);
    			append_dev(div5, t6);
    			append_dev(div5, img2);
    			append_dev(div10, t7);
    			append_dev(div10, div7);
    			append_dev(div7, div6);
    			append_dev(div7, t8);
    			append_dev(div7, img3);
    			append_dev(div10, t9);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div9, t10);
    			append_dev(div9, img4);
    			append_dev(main, t11);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(main, t12);
    			append_dev(main, div12);
    			append_dev(main, t13);
    			mount_component(scroller, main, null);
    			append_dev(main, t14);
    			append_dev(main, div13);
    			append_dev(main, t15);
    			append_dev(main, div_1);
    			mount_component(paragraph, div_1, null);
    			append_dev(main, t16);
    			append_dev(main, div_2);
    			mount_component(credit_1, div_2, null);
    			append_dev(main, t17);
    			append_dev(main, div_3);
    			mount_component(foot, div_3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const head_changes = {};

    			if (!updating_height && dirty & /*height*/ 16) {
    				updating_height = true;
    				head_changes.height = /*height*/ ctx[4];
    				add_flush_callback(() => updating_height = false);
    			}

    			head.$set(head_changes);

    			if (!current || dirty & /*height*/ 16) {
    				set_style(div11, "margin-top", /*height*/ ctx[4] + "px");
    			}

    			const scroller_changes = {};

    			if (dirty & /*$$scope, offset, index*/ 16777222) {
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
    			transition_in(head.$$.fragment, local);
    			transition_in(header.$$.fragment, local);
    			transition_in(scroller.$$.fragment, local);
    			transition_in(paragraph.$$.fragment, local);
    			transition_in(credit_1.$$.fragment, local);
    			transition_in(foot.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			transition_out(scroller.$$.fragment, local);
    			transition_out(paragraph.$$.fragment, local);
    			transition_out(credit_1.$$.fragment, local);
    			transition_out(foot.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(head);
    			destroy_component(header);
    			destroy_component(scroller);
    			destroy_component(paragraph);
    			destroy_component(credit_1);
    			destroy_component(foot);
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
    	let fontColor = '#f9f9e1';

    	//Secondary Dark Color
    	let colorBrandDarkBlue = "#242053";

    	// scroller variables
    	let count, index, offset, progress;

    	let top = 0;
    	let threshold = 0;
    	let bottom = 1;

    	// styling variables
    	let mainBackground = '#761fff';

    	let headerBackground = '#761fff';
    	let titleColor = '#f9f9e1';
    	let subtitleColor = '#f9f9e1';
    	let subheadColor = '#f9f9e1';
    	let height;

    	let subhead = [
    		'Indonesia adalah salah satu negara dengan jumlah jenis ular berbisa terbanyak di dunia. Totalnya 77 jenis yang terbagi ke dalam tiga famili: <em>elapidae</em>, <em>viperidae</em>, & <em>colubridae</em>',
    		'Namun,  sampai saat ini Indonesia hanya memiliki stok antivenom untuk 8-10 jenis ular berbisa. Masih ada 67 jenis ular berbisa lain yang tak punya antivenom. Jumlah tersebut lebih sedikit dari Australia yang masing-masing memiliki antivenom untuk 7-12 jenis ular dan Thailand yang punya 12-20 antivenom.',
    		'Sedangkan jumlah ular berbisa di Indonesia jauh lebih banyak dibandingkan Australia dan Malaysia yang masing-masing hanya 20 jenis. Sementara di dunia terdapat 320 jenis ular berbisa yang mematikan, menurut WHO. Artinya, 24 persen di antara berada di negeri ini.'
    	];

    	let credit = [{ role: 'Penulis', name: 'Lorem Ipsum' }];
    	let source = 'Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function head_height_binding(value) {
    		height = value;
    		$$invalidate(4, height);
    	}

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
    		Head,
    		Header,
    		Paragraph,
    		Quote,
    		Image,
    		Credit,
    		Foot,
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
    		subhead,
    		credit,
    		source
    	});

    	$$self.$inject_state = $$props => {
    		if ('fontfamily1' in $$props) $$invalidate(5, fontfamily1 = $$props.fontfamily1);
    		if ('fontColor' in $$props) $$invalidate(6, fontColor = $$props.fontColor);
    		if ('colorBrandDarkBlue' in $$props) $$invalidate(7, colorBrandDarkBlue = $$props.colorBrandDarkBlue);
    		if ('count' in $$props) $$invalidate(0, count = $$props.count);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    		if ('offset' in $$props) $$invalidate(2, offset = $$props.offset);
    		if ('progress' in $$props) $$invalidate(3, progress = $$props.progress);
    		if ('top' in $$props) $$invalidate(8, top = $$props.top);
    		if ('threshold' in $$props) $$invalidate(9, threshold = $$props.threshold);
    		if ('bottom' in $$props) $$invalidate(10, bottom = $$props.bottom);
    		if ('mainBackground' in $$props) $$invalidate(11, mainBackground = $$props.mainBackground);
    		if ('headerBackground' in $$props) $$invalidate(12, headerBackground = $$props.headerBackground);
    		if ('titleColor' in $$props) $$invalidate(13, titleColor = $$props.titleColor);
    		if ('subtitleColor' in $$props) $$invalidate(14, subtitleColor = $$props.subtitleColor);
    		if ('subheadColor' in $$props) $$invalidate(15, subheadColor = $$props.subheadColor);
    		if ('height' in $$props) $$invalidate(4, height = $$props.height);
    		if ('subhead' in $$props) $$invalidate(16, subhead = $$props.subhead);
    		if ('credit' in $$props) $$invalidate(17, credit = $$props.credit);
    		if ('source' in $$props) $$invalidate(18, source = $$props.source);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		count,
    		index,
    		offset,
    		progress,
    		height,
    		fontfamily1,
    		fontColor,
    		colorBrandDarkBlue,
    		top,
    		threshold,
    		bottom,
    		mainBackground,
    		headerBackground,
    		titleColor,
    		subtitleColor,
    		subheadColor,
    		subhead,
    		credit,
    		source,
    		head_height_binding,
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
