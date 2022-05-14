
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
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
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
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
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
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
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
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
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
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

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

    const file$a = "src\\Head.svelte";

    function create_fragment$a(ctx) {
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
    			add_location(img, file$a, 8, 16, 205);
    			attr_dev(a, "href", "https://dev.jurno.id");
    			add_location(a, file$a, 7, 12, 156);
    			attr_dev(div0, "class", "header-logo svelte-98yyk7");
    			add_location(div0, file$a, 6, 8, 117);
    			attr_dev(div1, "class", "container svelte-98yyk7");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[1].call(div1));
    			add_location(div1, file$a, 5, 4, 57);
    			attr_dev(nav, "class", "svelte-98yyk7");
    			add_location(nav, file$a, 4, 0, 46);
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { height: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Head",
    			options,
    			id: create_fragment$a.name
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

    const file$9 = "src\\Header.svelte";

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
    	let t2;
    	let aside;
    	let div1;
    	let t3;
    	let strong;
    	let t4;
    	let t5;
    	let div2;
    	let t6;
    	let t7;
    	let if_block = /*subtitle*/ ctx[1] && create_if_block_1$1(ctx);
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
    			if (if_block) if_block.c();
    			t2 = space();
    			aside = element("aside");
    			div1 = element("div");
    			t3 = text("Oleh ");
    			strong = element("strong");
    			t4 = text(/*author*/ ctx[3]);
    			t5 = space();
    			div2 = element("div");
    			t6 = text(/*date*/ ctx[4]);
    			t7 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "title svelte-19650d3");
    			add_location(div0, file$9, 29, 12, 915);
    			add_location(strong, file$9, 34, 41, 1129);
    			attr_dev(div1, "class", "author");
    			add_location(div1, file$9, 34, 16, 1104);
    			attr_dev(div2, "class", "tanggal");
    			add_location(div2, file$9, 35, 16, 1180);
    			attr_dev(aside, "class", "credit svelte-19650d3");
    			add_location(aside, file$9, 33, 12, 1064);
    			attr_dev(div3, "class", "title-section svelte-19650d3");
    			add_location(div3, file$9, 28, 8, 874);
    			add_location(section, file$9, 26, 4, 853);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div0);
    			append_dev(div0, t0);
    			append_dev(div3, t1);
    			if (if_block) if_block.m(div3, null);
    			append_dev(div3, t2);
    			append_dev(div3, aside);
    			append_dev(aside, div1);
    			append_dev(div1, t3);
    			append_dev(div1, strong);
    			append_dev(strong, t4);
    			append_dev(aside, t5);
    			append_dev(aside, div2);
    			append_dev(div2, t6);
    			append_dev(div3, t7);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (/*subtitle*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					if_block.m(div3, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*author*/ 8) set_data_dev(t4, /*author*/ ctx[3]);
    			if (dirty & /*date*/ 16) set_data_dev(t6, /*date*/ ctx[4]);

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
    			if (if_block) if_block.d();
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
    			attr_dev(div0, "class", "title svelte-19650d3");
    			add_location(div0, file$9, 9, 16, 243);
    			attr_dev(div1, "class", "subtitle svelte-19650d3");
    			add_location(div1, file$9, 10, 16, 295);
    			add_location(strong, file$9, 18, 45, 628);
    			attr_dev(div2, "class", "author");
    			add_location(div2, file$9, 18, 20, 603);
    			attr_dev(div3, "class", "tanggal");
    			add_location(div3, file$9, 19, 20, 683);
    			attr_dev(aside, "class", "credit svelte-19650d3");
    			add_location(aside, file$9, 17, 16, 559);
    			attr_dev(div4, "class", "title-section svelte-19650d3");
    			add_location(div4, file$9, 8, 12, 198);
    			attr_dev(div5, "class", "gradient svelte-19650d3");
    			add_location(div5, file$9, 22, 12, 778);
    			attr_dev(div6, "class", "full-header-img svelte-19650d3");
    			add_location(div6, file$9, 7, 8, 155);
    			add_location(section, file$9, 6, 4, 136);
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

    // (31:12) {#if subtitle}
    function create_if_block_1$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*subtitle*/ ctx[1]);
    			attr_dev(div, "class", "subtitle svelte-19650d3");
    			add_location(div, file$9, 31, 12, 991);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtitle*/ 2) set_data_dev(t, /*subtitle*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(31:12) {#if subtitle}",
    		ctx
    	});

    	return block;
    }

    // (38:12) {#each subhead as sub}
    function create_each_block_1(ctx) {
    	let div;
    	let raw_value = /*sub*/ ctx[6] + "";

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "subhead svelte-19650d3");
    			add_location(div, file$9, 38, 20, 1295);
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
    		source: "(38:12) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    // (12:16) {#each subhead as sub}
    function create_each_block$3(ctx) {
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
    			add_location(p, file$9, 13, 24, 444);
    			attr_dev(div, "class", "subhead svelte-19650d3");
    			add_location(div, file$9, 12, 20, 397);
    			add_location(br, file$9, 15, 20, 512);
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
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(12:16) {#each subhead as sub}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
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
    			id: create_fragment$9.name
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

    const file$8 = "src\\Paragraph.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each para as p}
    function create_each_block$2(ctx) {
    	let p;
    	let raw_value = /*p*/ ctx[1] + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "svelte-1o0jkfx");
    			add_location(p, file$8, 8, 8, 157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*para*/ 1 && raw_value !== (raw_value = /*p*/ ctx[1] + "")) p.innerHTML = raw_value;		},
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

    function create_fragment$8(ctx) {
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
    			add_location(section, file$8, 5, 0, 79);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { para: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$8.name
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

    const file$7 = "src\\Quote.svelte";

    function create_fragment$7(ctx) {
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
    			add_location(div0, file$7, 7, 12, 153);
    			attr_dev(img, "class", "quote-img svelte-1o0bngr");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*imgalt*/ ctx[1]);
    			add_location(img, file$7, 8, 12, 193);
    			attr_dev(div1, "class", "quote-pic svelte-1o0bngr");
    			add_location(div1, file$7, 6, 8, 116);
    			attr_dev(div2, "class", "quotes-tri svelte-1o0bngr");
    			add_location(div2, file$7, 12, 12, 322);
    			attr_dev(p, "class", "svelte-1o0bngr");
    			add_location(p, file$7, 14, 16, 404);
    			attr_dev(div3, "class", "quotes svelte-1o0bngr");
    			add_location(div3, file$7, 13, 12, 366);
    			attr_dev(span, "class", "quotes-bold svelte-1o0bngr");
    			add_location(span, file$7, 17, 16, 497);
    			attr_dev(div4, "class", "quote-name svelte-1o0bngr");
    			add_location(div4, file$7, 16, 12, 455);
    			attr_dev(div5, "class", "quotes-right svelte-1o0bngr");
    			add_location(div5, file$7, 11, 8, 282);
    			attr_dev(figure, "class", "svelte-1o0bngr");
    			add_location(figure, file$7, 5, 4, 98);
    			attr_dev(section, "class", "svelte-1o0bngr");
    			add_location(section, file$7, 4, 0, 83);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
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
    			id: create_fragment$7.name
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

    const file$6 = "src\\Image.svelte";

    function create_fragment$6(ctx) {
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
    			add_location(div0, file$6, 15, 2, 437);
    			attr_dev(img0, "id", "g-Korean-Waves-smallplus-data-img");
    			attr_dev(img0, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Korean-Waves-smallplus-data.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$6, 16, 4, 486);
    			attr_dev(span0, "class", "g-cstyle0");
    			add_location(span0, file$6, 18, 26, 782);
    			attr_dev(p0, "class", "g-pstyle0");
    			add_location(p0, file$6, 18, 5, 761);
    			attr_dev(p1, "class", "g-pstyle1");
    			add_location(p1, file$6, 19, 5, 835);
    			attr_dev(p2, "class", "g-pstyle0");
    			add_location(p2, file$6, 20, 5, 875);
    			attr_dev(div1, "id", "g-ai25-1");
    			attr_dev(div1, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div1, "top", "34.0296%");
    			set_style(div1, "margin-top", "-57.2px");
    			set_style(div1, "left", "49.2184%");
    			set_style(div1, "margin-left", "-148.5px");
    			set_style(div1, "width", "297px");
    			add_location(div1, file$6, 17, 4, 607);
    			attr_dev(p3, "class", "g-pstyle2");
    			add_location(p3, file$6, 23, 5, 1061);
    			attr_dev(p4, "class", "g-pstyle2");
    			add_location(p4, file$6, 24, 5, 1106);
    			attr_dev(div2, "id", "g-ai25-2");
    			attr_dev(div2, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div2, "top", "51.464%");
    			set_style(div2, "margin-top", "-14.2px");
    			set_style(div2, "left", "4.6825%");
    			set_style(div2, "width", "99px");
    			add_location(div2, file$6, 22, 4, 931);
    			attr_dev(p5, "class", "g-pstyle3");
    			add_location(p5, file$6, 27, 5, 1284);
    			attr_dev(p6, "class", "g-pstyle3");
    			add_location(p6, file$6, 28, 5, 1329);
    			attr_dev(div3, "id", "g-ai25-3");
    			attr_dev(div3, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div3, "top", "51.464%");
    			set_style(div3, "margin-top", "-14.2px");
    			set_style(div3, "right", "4.0607%");
    			set_style(div3, "width", "99px");
    			add_location(div3, file$6, 26, 4, 1153);
    			attr_dev(div4, "id", "g-Korean-Waves-smallplus-data");
    			attr_dev(div4, "class", "g-artboard");
    			set_style(div4, "max-width", "509px");
    			set_style(div4, "max-height", "1113px");
    			attr_dev(div4, "data-aspect-ratio", "0.457");
    			attr_dev(div4, "data-min-width", "0");
    			attr_dev(div4, "data-max-width", "509");
    			add_location(div4, file$6, 14, 1, 264);
    			set_style(div5, "padding", "0 0 156.8627% 0");
    			add_location(div5, file$6, 34, 2, 1620);
    			attr_dev(img1, "id", "g-Korean-Waves-submedium-data-img");
    			attr_dev(img1, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Korean-Waves-submedium-data.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$6, 35, 4, 1671);
    			attr_dev(span1, "class", "g-cstyle0");
    			add_location(span1, file$6, 37, 26, 1967);
    			attr_dev(p7, "class", "g-pstyle0");
    			add_location(p7, file$6, 37, 5, 1946);
    			attr_dev(p8, "class", "g-pstyle1");
    			add_location(p8, file$6, 38, 5, 2020);
    			attr_dev(p9, "class", "g-pstyle0");
    			add_location(p9, file$6, 39, 5, 2060);
    			attr_dev(div6, "id", "g-ai26-1");
    			attr_dev(div6, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div6, "top", "26.7684%");
    			set_style(div6, "margin-top", "-75.1px");
    			set_style(div6, "left", "50.0015%");
    			set_style(div6, "margin-left", "-191.5px");
    			set_style(div6, "width", "383px");
    			add_location(div6, file$6, 36, 4, 1792);
    			attr_dev(p10, "class", "g-pstyle2");
    			add_location(p10, file$6, 42, 5, 2248);
    			attr_dev(p11, "class", "g-pstyle2");
    			add_location(p11, file$6, 43, 5, 2293);
    			attr_dev(div7, "id", "g-ai26-2");
    			attr_dev(div7, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div7, "top", "50.2573%");
    			set_style(div7, "margin-top", "-23.1px");
    			set_style(div7, "left", "3.7282%");
    			set_style(div7, "width", "147px");
    			add_location(div7, file$6, 41, 4, 2116);
    			attr_dev(p12, "class", "g-pstyle3");
    			add_location(p12, file$6, 46, 5, 2473);
    			attr_dev(p13, "class", "g-pstyle3");
    			add_location(p13, file$6, 47, 5, 2518);
    			attr_dev(div8, "id", "g-ai26-3");
    			attr_dev(div8, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div8, "top", "50.2573%");
    			set_style(div8, "margin-top", "-23.1px");
    			set_style(div8, "right", "3.1528%");
    			set_style(div8, "width", "147px");
    			add_location(div8, file$6, 45, 4, 2340);
    			attr_dev(div9, "id", "g-Korean-Waves-submedium-data");
    			attr_dev(div9, "class", "g-artboard");
    			set_style(div9, "min-width", "510px");
    			set_style(div9, "max-width", "689px");
    			set_style(div9, "max-height", "1081px");
    			attr_dev(div9, "data-aspect-ratio", "0.638");
    			attr_dev(div9, "data-min-width", "510");
    			attr_dev(div9, "data-max-width", "689");
    			add_location(div9, file$6, 33, 3, 1428);
    			set_style(div10, "padding", "0 0 148.4058% 0");
    			add_location(div10, file$6, 53, 2, 2803);
    			attr_dev(img2, "id", "g-Korean-Waves-medium-data-img");
    			attr_dev(img2, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Korean-Waves-medium-data.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$6, 54, 4, 2854);
    			attr_dev(span2, "class", "g-cstyle0");
    			add_location(span2, file$6, 56, 26, 3143);
    			attr_dev(p14, "class", "g-pstyle0");
    			add_location(p14, file$6, 56, 5, 3122);
    			attr_dev(p15, "class", "g-pstyle1");
    			add_location(p15, file$6, 57, 5, 3196);
    			attr_dev(p16, "class", "g-pstyle0");
    			add_location(p16, file$6, 58, 5, 3236);
    			attr_dev(div11, "id", "g-ai27-1");
    			attr_dev(div11, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div11, "top", "27.0156%");
    			set_style(div11, "margin-top", "-107.6px");
    			set_style(div11, "left", "50.0224%");
    			set_style(div11, "margin-left", "-269px");
    			set_style(div11, "width", "538px");
    			add_location(div11, file$6, 55, 4, 2969);
    			attr_dev(p17, "class", "g-pstyle2");
    			add_location(p17, file$6, 61, 5, 3424);
    			attr_dev(p18, "class", "g-pstyle2");
    			add_location(p18, file$6, 62, 5, 3469);
    			attr_dev(div12, "id", "g-ai27-2");
    			attr_dev(div12, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div12, "top", "49.5576%");
    			set_style(div12, "margin-top", "-31.5px");
    			set_style(div12, "left", "4.0423%");
    			set_style(div12, "width", "190px");
    			add_location(div12, file$6, 60, 4, 3292);
    			attr_dev(p19, "class", "g-pstyle3");
    			add_location(p19, file$6, 65, 5, 3649);
    			attr_dev(p20, "class", "g-pstyle3");
    			add_location(p20, file$6, 66, 5, 3694);
    			attr_dev(div13, "id", "g-ai27-3");
    			attr_dev(div13, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div13, "top", "49.5576%");
    			set_style(div13, "margin-top", "-31.5px");
    			set_style(div13, "right", "3.4664%");
    			set_style(div13, "width", "190px");
    			add_location(div13, file$6, 64, 4, 3516);
    			attr_dev(div14, "id", "g-Korean-Waves-medium-data");
    			attr_dev(div14, "class", "g-artboard");
    			set_style(div14, "min-width", "690px");
    			set_style(div14, "max-width", "919px");
    			set_style(div14, "max-height", "1364px");
    			attr_dev(div14, "data-aspect-ratio", "0.674");
    			attr_dev(div14, "data-min-width", "690");
    			attr_dev(div14, "data-max-width", "919");
    			add_location(div14, file$6, 52, 3, 2614);
    			set_style(div15, "padding", "0 0 100% 0");
    			add_location(div15, file$6, 72, 2, 3975);
    			attr_dev(img3, "id", "g-Korean-Waves-large-data-img");
    			attr_dev(img3, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Korean-Waves-large-data.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$6, 73, 4, 4021);
    			attr_dev(span3, "class", "g-cstyle0");
    			add_location(span3, file$6, 75, 26, 4305);
    			attr_dev(p21, "class", "g-pstyle0");
    			add_location(p21, file$6, 75, 5, 4284);
    			attr_dev(p22, "class", "g-pstyle1");
    			add_location(p22, file$6, 76, 5, 4358);
    			attr_dev(p23, "class", "g-pstyle0");
    			add_location(p23, file$6, 77, 5, 4398);
    			attr_dev(div16, "id", "g-ai28-1");
    			attr_dev(div16, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div16, "top", "19.2%");
    			set_style(div16, "margin-top", "-107.6px");
    			set_style(div16, "left", "50.0168%");
    			set_style(div16, "margin-left", "-269px");
    			set_style(div16, "width", "538px");
    			add_location(div16, file$6, 74, 4, 4134);
    			attr_dev(p24, "class", "g-pstyle2");
    			add_location(p24, file$6, 80, 5, 4586);
    			attr_dev(p25, "class", "g-pstyle2");
    			add_location(p25, file$6, 81, 5, 4631);
    			attr_dev(div17, "id", "g-ai28-2");
    			attr_dev(div17, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div17, "top", "41.7867%");
    			set_style(div17, "margin-top", "-42.4px");
    			set_style(div17, "left", "3.6724%");
    			set_style(div17, "width", "248px");
    			add_location(div17, file$6, 79, 4, 4454);
    			attr_dev(p26, "class", "g-pstyle3");
    			add_location(p26, file$6, 84, 5, 4811);
    			attr_dev(p27, "class", "g-pstyle3");
    			add_location(p27, file$6, 85, 5, 4856);
    			attr_dev(div18, "id", "g-ai28-3");
    			attr_dev(div18, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div18, "top", "41.7867%");
    			set_style(div18, "margin-top", "-42.4px");
    			set_style(div18, "right", "3.0703%");
    			set_style(div18, "width", "248px");
    			add_location(div18, file$6, 83, 4, 4678);
    			attr_dev(div19, "id", "g-Korean-Waves-large-data");
    			attr_dev(div19, "class", "g-artboard");
    			set_style(div19, "min-width", "920px");
    			set_style(div19, "max-width", "1399px");
    			set_style(div19, "max-height", "1399px");
    			attr_dev(div19, "data-aspect-ratio", "1");
    			attr_dev(div19, "data-min-width", "920");
    			attr_dev(div19, "data-max-width", "1399");
    			add_location(div19, file$6, 71, 3, 3789);
    			set_style(div20, "padding", "0 0 56.25% 0");
    			add_location(div20, file$6, 91, 2, 5087);
    			attr_dev(img4, "id", "g-Korean-Waves-xlarge-data-img");
    			attr_dev(img4, "class", "g-aiImg svelte-125p5jy");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Korean-Waves-xlarge-data.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$6, 92, 4, 5135);
    			attr_dev(span4, "class", "g-cstyle0");
    			add_location(span4, file$6, 94, 31, 5430);
    			attr_dev(p28, "class", "g-pstyle0");
    			add_location(p28, file$6, 94, 5, 5404);
    			attr_dev(p29, "class", "g-pstyle1");
    			add_location(p29, file$6, 95, 5, 5487);
    			attr_dev(div21, "id", "g-ai29-1");
    			attr_dev(div21, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div21, "top", "12.6527%");
    			set_style(div21, "margin-top", "-71.6px");
    			set_style(div21, "left", "49.9925%");
    			set_style(div21, "margin-left", "-388.5px");
    			set_style(div21, "width", "777px");
    			add_location(div21, file$6, 93, 4, 5250);
    			attr_dev(p30, "class", "g-pstyle2");
    			add_location(p30, file$6, 98, 5, 5676);
    			attr_dev(p31, "class", "g-pstyle2");
    			add_location(p31, file$6, 99, 5, 5721);
    			attr_dev(div22, "id", "g-ai29-2");
    			attr_dev(div22, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div22, "top", "33.1737%");
    			set_style(div22, "margin-top", "-45.2px");
    			set_style(div22, "left", "17.3621%");
    			set_style(div22, "width", "265px");
    			add_location(div22, file$6, 97, 4, 5543);
    			attr_dev(p32, "class", "g-pstyle3");
    			add_location(p32, file$6, 102, 5, 5902);
    			attr_dev(p33, "class", "g-pstyle3");
    			add_location(p33, file$6, 103, 5, 5947);
    			attr_dev(div23, "id", "g-ai29-3");
    			attr_dev(div23, "class", "g-Layer_1 g-aiAbs g-aiPointText");
    			set_style(div23, "top", "33.1737%");
    			set_style(div23, "margin-top", "-45.2px");
    			set_style(div23, "right", "16.8871%");
    			set_style(div23, "width", "265px");
    			add_location(div23, file$6, 101, 4, 5768);
    			attr_dev(div24, "id", "g-Korean-Waves-xlarge-data");
    			attr_dev(div24, "class", "g-artboard");
    			set_style(div24, "min-width", "1400px");
    			attr_dev(div24, "data-aspect-ratio", "1.778");
    			attr_dev(div24, "data-min-width", "1400");
    			add_location(div24, file$6, 90, 3, 4952);
    			attr_dev(div25, "id", "g-Korean-Waves-box");
    			attr_dev(div25, "class", "ai2html");
    			add_location(div25, file$6, 12, 4, 179);
    			add_location(br, file$6, 114, 42, 6244);
    			attr_dev(div26, "class", "source svelte-125p5jy");
    			add_location(div26, file$6, 114, 8, 6210);
    			add_location(aside, file$6, 113, 4, 6193);
    			attr_dev(figure, "class", "svelte-125p5jy");
    			add_location(figure, file$6, 10, 0, 163);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { img: 2, imageTitle: 0, imageSource: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$6.name
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

    const file$5 = "src\\Credit.svelte";

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
    			add_location(div0, file$5, 10, 12, 205);
    			attr_dev(div1, "class", "role");
    			add_location(div1, file$5, 12, 16, 286);
    			attr_dev(div2, "class", "name svelte-zw5351");
    			add_location(div2, file$5, 13, 16, 343);
    			attr_dev(div3, "class", "profname svelte-zw5351");
    			add_location(div3, file$5, 11, 12, 246);
    			attr_dev(div4, "class", "profile svelte-zw5351");
    			attr_dev(div4, "id", "p1");
    			add_location(div4, file$5, 9, 8, 162);
    			attr_dev(div5, "class", "profile-bar svelte-zw5351");
    			add_location(div5, file$5, 16, 8, 427);
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

    function create_fragment$5(ctx) {
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
    			add_location(div, file$5, 7, 4, 91);
    			add_location(br0, file$5, 19, 4, 484);
    			add_location(br1, file$5, 20, 22, 512);
    			attr_dev(section, "class", "svelte-zw5351");
    			add_location(section, file$5, 6, 0, 76);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { credit: 0, source: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Credit",
    			options,
    			id: create_fragment$5.name
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

    const file$4 = "src\\Foot.svelte";

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
    			attr_dev(img, "class", "imgthumb svelte-15qgk18");
    			if (!src_url_equal(img.src, img_src_value = /*d*/ ctx[1].origin_images)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*d*/ ctx[1].title);
    			add_location(img, file$4, 32, 32, 998);
    			attr_dev(div0, "class", "images svelte-15qgk18");
    			add_location(div0, file$4, 31, 28, 944);
    			attr_dev(p0, "class", "author svelte-15qgk18");
    			add_location(p0, file$4, 35, 32, 1178);
    			attr_dev(p1, "class", "article-title svelte-15qgk18");
    			add_location(p1, file$4, 36, 32, 1244);
    			attr_dev(div1, "class", "credit");
    			add_location(div1, file$4, 34, 28, 1124);
    			attr_dev(div2, "class", "news svelte-15qgk18");
    			add_location(div2, file$4, 30, 24, 896);
    			attr_dev(a, "href", /*d*/ ctx[1].source_url);
    			attr_dev(a, "class", "newspart svelte-15qgk18");
    			add_location(a, file$4, 29, 20, 830);
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

    function create_fragment$4(ctx) {
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
    			p.textContent = "Artikel Lainnya";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "title svelte-15qgk18");
    			add_location(p, file$4, 23, 8, 583);
    			attr_dev(div0, "class", "slider-container svelte-15qgk18");
    			add_location(div0, file$4, 24, 8, 629);
    			attr_dev(div1, "class", "container svelte-15qgk18");
    			add_location(div1, file$4, 22, 4, 550);
    			attr_dev(nav, "class", "svelte-15qgk18");
    			add_location(nav, file$4, 21, 0, 539);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Foot', slots, []);

    	let data = [
    		{
    			title: 'Lorem Ipsum',
    			source_url: '',
    			origin_images: './images/1__0iFAE8-sgh2ycQHD90BfQ.png',
    			author: 'Ann Putri'
    		},
    		{
    			title: 'Lorem Ipsum Dolor',
    			source_url: '',
    			origin_images: './images/1_86BC3VqISaNyv2sd3pY6PA.png',
    			author: 'Ahsan Ridhoi'
    		},
    		{
    			title: 'Sit Amet',
    			source_url: '',
    			origin_images: './images/1_bxLV9w6DAzlVJW7GxKq4Hg.png',
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Foot",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function quadInOut(t) {
        t /= 0.5;
        if (t < 1)
            return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
    }

    function writableSet(value = new Set()) {
      const store = writable(value);

      const wrap = (method) => {
        return (...args) => {
          let output;
          store.update((value) => {
            output = value[method](...args);
            return value;
          });
          return output;
        };
      };
      return {
        ...store,
        add: wrap("add"),
        delete: wrap("delete"),
      };
    }

    const contextKey = {};

    // temporary fork of https://github.com/langbamit/svelte-scrollto
    let supportsPassive = false;
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}

    var _ = {
      $(selector) {
        if (typeof selector === "string") {
          return document.querySelector(selector);
        }
        return selector;
      },
      extend(...args) {
        return Object.assign(...args);
      },
      addListeners(element, events, handler, opts = { passive: false }) {
        if (!(events instanceof Array)) {
         events = [events];
       }
       for (let i = 0; i < events.length; i++) {
         element.addEventListener(
           events[i],
           handler,
           supportsPassive ? opts : false
         );
       }
     },
     removeListeners(element, events, handler) {
       if (!(events instanceof Array)) {
         events = [events];
       }
       for (let i = 0; i < events.length; i++) {
         element.removeEventListener(events[i], handler);
       }
     },
      cumulativeOffset(element) {
        let top = 0;
        let left = 0;

        do {
          top += element.offsetTop || 0;
          left += element.offsetLeft || 0;
          element = element.offsetParent;
        } while (element);

        return {
          top: top,
          left: left
        };
      },
      directScroll(element) {
        return element && element !== document && element !== document.body;
      },
      scrollTop(element, value) {
        let inSetter = value !== undefined;
        if (this.directScroll(element)) {
          return inSetter ? (element.scrollTop = value) : element.scrollTop;
        } else {
          return inSetter
            ? (document.documentElement.scrollTop = document.body.scrollTop = value)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }
      },
      scrollLeft(element, value) {
        let inSetter = value !== undefined;
        if (this.directScroll(element)) {
          return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
        } else {
          return inSetter
            ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }
      }
    };

    // temporary fork of https://github.com/langbamit/svelte-scrollto

    const defaultOptions = {
      container: "body",
      duration: 500,
      delay: 0,
      offset: 0,
      easing: cubicInOut,
      onStart: noop,
      onDone: noop,
      onAborting: noop,
      scrollX: false,
      scrollY: true
    };

    const abortEvents = [
      'mousedown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'keydown',
      'touchmove',
    ];

    const _scrollTo = options => {
      let {
        offset,
        duration,
        delay,
        easing,
        x=0,
        y=0,
        scrollX,
        scrollY,
        onStart,
        onDone,
        container,
        onAborting,
        element
      } = options;

      if (typeof offset === "function") {
        offset = offset();
      }

      var cumulativeOffsetContainer = _.cumulativeOffset(container);
      var cumulativeOffsetTarget = element
        ? _.cumulativeOffset(element)
        : { top: y, left: x };

      var initialX = _.scrollLeft(container);
      var initialY = _.scrollTop(container);

      var targetX =
        cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
      var targetY =
        cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;

      var diffX = targetX - initialX;
    	var diffY = targetY - initialY;

      let scrolling = true;
      let started = false;
      let start_time = now() + delay;
      let end_time = start_time + duration;

      function scrollToTopLeft(element, top, left) {
        if (scrollX) _.scrollLeft(element, left);
        if (scrollY) _.scrollTop(element, top);
      }

      function start(delayStart) {
        if (!delayStart) {
          started = true;
          onStart(element, {x, y});
        }
        _.addListeners(container, abortEvents, stop, { passive: true });
      }

      function tick(progress) {
        scrollToTopLeft(
          container,
          initialY + diffY * progress,
          initialX + diffX * progress
        );
      }

      function stop() {
        scrolling = false;
        _.removeListeners(container, abortEvents, stop);
      }

      loop(now => {
        if (!started && now >= start_time) {
          start(false);
        }

        if (started && now >= end_time) {
          tick(1);
          stop();
          onDone(element, {x, y});
          return false;
        }

        if (!scrolling) {
          onAborting(element, {x, y});
          return false;
        }
        if (started) {
          const p = now - start_time;
          const t = 0 + 1 * easing(p / duration);
          tick(t);
        }

        return true;
      });

      start(delay);

      tick(0);

      return stop;
    };

    const proceedOptions = options => {
    	let opts = _.extend({}, defaultOptions, options);
      opts.container = _.$(opts.container);
      opts.element = _.$(opts.element);
      return opts;
    };

    const scrollTo = options => {
      return _scrollTo(proceedOptions(options));
    };

    // focus - focusOptions - preventScroll polyfill
    (function() {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined" ||
        typeof HTMLElement === "undefined"
      ) {
        return;
      }

      var supportsPreventScrollOption = false;
      try {
        var focusElem = document.createElement("div");
        focusElem.addEventListener(
          "focus",
          function(event) {
            event.preventDefault();
            event.stopPropagation();
          },
          true
        );
        focusElem.focus(
          Object.defineProperty({}, "preventScroll", {
            get: function() {
              // Edge v18 gives a false positive for supporting inputs
              if (
                navigator &&
                typeof navigator.userAgent !== 'undefined' &&
                navigator.userAgent &&
                navigator.userAgent.match(/Edge\/1[7-8]/)) {
                  return supportsPreventScrollOption = false
              }

              supportsPreventScrollOption = true;
            }
          })
        );
      } catch (e) {}

      if (
        HTMLElement.prototype.nativeFocus === undefined &&
        !supportsPreventScrollOption
      ) {
        HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

        var calcScrollableElements = function(element) {
          var parent = element.parentNode;
          var scrollableElements = [];
          var rootScrollingElement =
            document.scrollingElement || document.documentElement;

          while (parent && parent !== rootScrollingElement) {
            if (
              parent.offsetHeight < parent.scrollHeight ||
              parent.offsetWidth < parent.scrollWidth
            ) {
              scrollableElements.push([
                parent,
                parent.scrollTop,
                parent.scrollLeft
              ]);
            }
            parent = parent.parentNode;
          }
          parent = rootScrollingElement;
          scrollableElements.push([parent, parent.scrollTop, parent.scrollLeft]);

          return scrollableElements;
        };

        var restoreScrollPosition = function(scrollableElements) {
          for (var i = 0; i < scrollableElements.length; i++) {
            scrollableElements[i][0].scrollTop = scrollableElements[i][1];
            scrollableElements[i][0].scrollLeft = scrollableElements[i][2];
          }
          scrollableElements = [];
        };

        var patchedFocus = function(args) {
          if (args && args.preventScroll) {
            var evScrollableElements = calcScrollableElements(this);
            if (typeof setTimeout === 'function') {
              var thisElem = this;
              setTimeout(function () {
                thisElem.nativeFocus();
                restoreScrollPosition(evScrollableElements);
              }, 0);
            } else {
              this.nativeFocus();
              restoreScrollPosition(evScrollableElements);
            }
          }
          else {
            this.nativeFocus();
          }
        };

        HTMLElement.prototype.focus = patchedFocus;
      }
    })();

    /* node_modules\svelte-parallax\src\Parallax.svelte generated by Svelte v3.46.4 */

    const { scrollTo: scrollTo_1, setTimeout: setTimeout_1, window: window_1$1 } = globals;
    const file$3 = "node_modules\\svelte-parallax\\src\\Parallax.svelte";

    function create_fragment$3(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[25]);
    	add_render_callback(/*onwindowresize*/ ctx[26]);
    	const default_slot_template = /*#slots*/ ctx[23].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[22], null);

    	let div_levels = [
    		/*$$restProps*/ ctx[11],
    		{
    			class: div_class_value = "parallax-container " + (/*$$restProps*/ ctx[11].class
    			? /*$$restProps*/ ctx[11].class
    			: '')
    		},
    		{
    			style: div_style_value = "height: " + /*$height*/ ctx[1] * /*sections*/ ctx[0] + "px; " + (/*$$restProps*/ ctx[11].style
    			? /*$$restProps*/ ctx[11].style
    			: '') + ";"
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "svelte-15ph2c6", true);
    			add_location(div, file$3, 135, 0, 4511);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[27](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1$1, "resize", /*resize_handler*/ ctx[24], false, false, false),
    					listen_dev(window_1$1, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[25]();
    					}),
    					listen_dev(window_1$1, "resize", /*onwindowresize*/ ctx[26])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$y*/ 16 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo_1(window_1$1.pageXOffset, /*$y*/ ctx[4]);
    				scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 4194304)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[22],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[22])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[22], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				(!current || dirty[0] & /*$$restProps*/ 2048 && div_class_value !== (div_class_value = "parallax-container " + (/*$$restProps*/ ctx[11].class
    				? /*$$restProps*/ ctx[11].class
    				: ''))) && { class: div_class_value },
    				(!current || dirty[0] & /*$height, sections, $$restProps*/ 2051 && div_style_value !== (div_style_value = "height: " + /*$height*/ ctx[1] * /*sections*/ ctx[0] + "px; " + (/*$$restProps*/ ctx[11].style
    				? /*$$restProps*/ ctx[11].style
    				: '') + ";")) && { style: div_style_value }
    			]));

    			toggle_class(div, "svelte-15ph2c6", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[27](null);
    			mounted = false;
    			run_all(dispose);
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
    	const omit_props_names = [
    		"sections","sectionHeight","config","threshold","onProgress","disabled","onEnter","onExit","scrollTo"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $height;
    	let $top;
    	let $scrollTop;
    	let $layers;
    	let $y;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Parallax', slots, ['default']);
    	let container;

    	// bind:innerHeight
    	let innerHeight;

    	let { sections = 1 } = $$props;
    	let { sectionHeight = undefined } = $$props;
    	let { config = { stiffness: 0.017, damping: 0.26 } } = $$props;
    	let { threshold = { top: 1, bottom: 1 } } = $$props;
    	let { onProgress = undefined } = $$props;
    	let { disabled = false } = $$props;
    	let { onEnter = undefined } = $$props;
    	let { onExit = undefined } = $$props;

    	// bind:scrollY
    	const y = writable(0);

    	validate_store(y, 'y');
    	component_subscribe($$self, y, value => $$invalidate(4, $y = value));

    	// top coord of Parallax container
    	const top = writable(0);

    	validate_store(top, 'top');
    	component_subscribe($$self, top, value => $$invalidate(28, $top = value));

    	// height of a section
    	const height = writable(0);

    	validate_store(height, 'height');
    	component_subscribe($$self, height, value => $$invalidate(1, $height = value));

    	// this is only here until legacy onEnter/onExit API is removed
    	const legacyEnter = onEnter ? 0 : 1;

    	const legacyExit = onExit ? 0 : 1;
    	const enter = onEnter === undefined ? threshold.top : legacyEnter;
    	const exit = onExit === undefined ? threshold.bottom : legacyExit;

    	// fake intersection observer
    	const scrollTop = derived([y, top, height], ([$y, $top, $height], set) => {
    		const dy = $y - $top;
    		const min = 0 - $height + $height * enter;
    		const max = $height * sections - $height * exit;

    		// sorry
    		const step = dy < min ? min : dy > max ? max : dy;

    		set(step);
    	});

    	validate_store(scrollTop, 'scrollTop');
    	component_subscribe($$self, scrollTop, value => $$invalidate(20, $scrollTop = value));

    	const getProgress = (scrollTop, height) => {
    		// subtract height because progress doesn't start until top of container is at top of viewport
    		const scrollHeight = height * sections - height;

    		const parallaxProgress = scrollTop / scrollHeight;
    		const containerHeight = height * sections;
    		const section = Math.floor(scrollTop / containerHeight * sections);
    		const sectionScrollTop = scrollTop - height * section;
    		const sectionProgress = sectionScrollTop / height;

    		// stop updating parallaxProgress to avoid values greater than 1
    		// stop updating section because we're adding 1 (sections aren't zero-indexed, but the math is)
    		// continue updating sectionProgress in case value is needed beyond the bottom of the container
    		const end = scrollTop >= scrollHeight;

    		onProgress({
    			parallaxProgress: end ? 1 : parallaxProgress,
    			section: end ? sections : section + 1,
    			sectionProgress
    		});
    	};

    	// eventually filled with ParallaxLayer objects
    	const layers = writableSet(new Set());

    	validate_store(layers, 'layers');
    	component_subscribe($$self, layers, value => $$invalidate(21, $layers = value));

    	setContext(contextKey, {
    		config,
    		addLayer: layer => {
    			layers.add(layer);
    		},
    		removeLayer: layer => {
    			layers.delete(layer);
    		}
    	});

    	onMount(() => {
    		setDimensions();
    	});

    	function setDimensions() {
    		height.set(sectionHeight ? sectionHeight : innerHeight);
    		top.set(container.getBoundingClientRect().top + window.pageYOffset);
    	}

    	function scrollTo$1(section, { selector = '', duration = 500, easing = quadInOut } = {}) {
    		const scrollTarget = $top + $height * (section - 1);

    		const focusTarget = () => {
    			document.querySelector(selector).focus({ preventScroll: true });
    		};

    		// don't animate scroll if disabled
    		if (disabled) {
    			window.scrollTo({ top: scrollTarget });
    			selector && focusTarget();
    			return;
    		}

    		scrollTo({
    			y: scrollTarget,
    			duration,
    			easing,
    			onDone: selector
    			? focusTarget
    			: () => {
    					
    				}
    		});
    	}

    	const resize_handler = () => setTimeout(setDimensions, 0);

    	function onwindowscroll() {
    		y.set($y = window_1$1.pageYOffset);
    	}

    	function onwindowresize() {
    		$$invalidate(3, innerHeight = window_1$1.innerHeight);
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(2, container);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('sections' in $$new_props) $$invalidate(0, sections = $$new_props.sections);
    		if ('sectionHeight' in $$new_props) $$invalidate(12, sectionHeight = $$new_props.sectionHeight);
    		if ('config' in $$new_props) $$invalidate(13, config = $$new_props.config);
    		if ('threshold' in $$new_props) $$invalidate(14, threshold = $$new_props.threshold);
    		if ('onProgress' in $$new_props) $$invalidate(15, onProgress = $$new_props.onProgress);
    		if ('disabled' in $$new_props) $$invalidate(16, disabled = $$new_props.disabled);
    		if ('onEnter' in $$new_props) $$invalidate(17, onEnter = $$new_props.onEnter);
    		if ('onExit' in $$new_props) $$invalidate(18, onExit = $$new_props.onExit);
    		if ('$$scope' in $$new_props) $$invalidate(22, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		onMount,
    		writable,
    		derived,
    		quadInOut,
    		writableSet,
    		contextKey,
    		svelteScrollTo: scrollTo,
    		container,
    		innerHeight,
    		sections,
    		sectionHeight,
    		config,
    		threshold,
    		onProgress,
    		disabled,
    		onEnter,
    		onExit,
    		y,
    		top,
    		height,
    		legacyEnter,
    		legacyExit,
    		enter,
    		exit,
    		scrollTop,
    		getProgress,
    		layers,
    		setDimensions,
    		scrollTo: scrollTo$1,
    		$height,
    		$top,
    		$scrollTop,
    		$layers,
    		$y
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('container' in $$props) $$invalidate(2, container = $$new_props.container);
    		if ('innerHeight' in $$props) $$invalidate(3, innerHeight = $$new_props.innerHeight);
    		if ('sections' in $$props) $$invalidate(0, sections = $$new_props.sections);
    		if ('sectionHeight' in $$props) $$invalidate(12, sectionHeight = $$new_props.sectionHeight);
    		if ('config' in $$props) $$invalidate(13, config = $$new_props.config);
    		if ('threshold' in $$props) $$invalidate(14, threshold = $$new_props.threshold);
    		if ('onProgress' in $$props) $$invalidate(15, onProgress = $$new_props.onProgress);
    		if ('disabled' in $$props) $$invalidate(16, disabled = $$new_props.disabled);
    		if ('onEnter' in $$props) $$invalidate(17, onEnter = $$new_props.onEnter);
    		if ('onExit' in $$props) $$invalidate(18, onExit = $$new_props.onExit);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*onProgress, $height, $scrollTop*/ 1081346) {
    			if (onProgress && $height > 0 && $scrollTop >= 0) getProgress($scrollTop, $height);
    		}

    		if ($$self.$$.dirty[0] & /*$layers, $height*/ 2097154) {
    			// update ParallaxLayers from parent
    			$layers.forEach(layer => {
    				layer.setHeight($height);
    			});
    		}

    		if ($$self.$$.dirty[0] & /*$layers, $scrollTop, $height, disabled*/ 3211266) {
    			$layers.forEach(layer => {
    				layer.setPosition($scrollTop, $height, disabled);
    			});
    		}

    		if ($$self.$$.dirty[0] & /*$height, sectionHeight*/ 4098) {
    			if ($height !== 0) (setDimensions());
    		}
    	};

    	return [
    		sections,
    		$height,
    		container,
    		innerHeight,
    		$y,
    		y,
    		top,
    		height,
    		scrollTop,
    		layers,
    		setDimensions,
    		$$restProps,
    		sectionHeight,
    		config,
    		threshold,
    		onProgress,
    		disabled,
    		onEnter,
    		onExit,
    		scrollTo$1,
    		$scrollTop,
    		$layers,
    		$$scope,
    		slots,
    		resize_handler,
    		onwindowscroll,
    		onwindowresize,
    		div_binding
    	];
    }

    class Parallax extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$3,
    			create_fragment$3,
    			safe_not_equal,
    			{
    				sections: 0,
    				sectionHeight: 12,
    				config: 13,
    				threshold: 14,
    				onProgress: 15,
    				disabled: 16,
    				onEnter: 17,
    				onExit: 18,
    				scrollTo: 19
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Parallax",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get sections() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sections(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sectionHeight() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sectionHeight(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get config() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set config(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threshold() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threshold(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onProgress() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onProgress(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onEnter() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onEnter(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onExit() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onExit(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollTo() {
    		return this.$$.ctx[19];
    	}

    	set scrollTo(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function tick_spring(ctx, last_value, current_value, target_value) {
        if (typeof current_value === 'number' || is_date(current_value)) {
            // @ts-ignore
            const delta = target_value - current_value;
            // @ts-ignore
            const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
            const spring = ctx.opts.stiffness * delta;
            const damper = ctx.opts.damping * velocity;
            const acceleration = (spring - damper) * ctx.inv_mass;
            const d = (velocity + acceleration) * ctx.dt;
            if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
                return target_value; // settled
            }
            else {
                ctx.settled = false; // signal loop to keep ticking
                // @ts-ignore
                return is_date(current_value) ?
                    new Date(current_value.getTime() + d) : current_value + d;
            }
        }
        else if (Array.isArray(current_value)) {
            // @ts-ignore
            return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
        }
        else if (typeof current_value === 'object') {
            const next_value = {};
            for (const k in current_value) {
                // @ts-ignore
                next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
            }
            // @ts-ignore
            return next_value;
        }
        else {
            throw new Error(`Cannot spring ${typeof current_value} values`);
        }
    }
    function spring(value, opts = {}) {
        const store = writable(value);
        const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
        let last_time;
        let task;
        let current_token;
        let last_value = value;
        let target_value = value;
        let inv_mass = 1;
        let inv_mass_recovery_rate = 0;
        let cancel_task = false;
        function set(new_value, opts = {}) {
            target_value = new_value;
            const token = current_token = {};
            if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
                cancel_task = true; // cancel any running animation
                last_time = now();
                last_value = new_value;
                store.set(value = target_value);
                return Promise.resolve();
            }
            else if (opts.soft) {
                const rate = opts.soft === true ? .5 : +opts.soft;
                inv_mass_recovery_rate = 1 / (rate * 60);
                inv_mass = 0; // infinite mass, unaffected by spring forces
            }
            if (!task) {
                last_time = now();
                cancel_task = false;
                task = loop(now => {
                    if (cancel_task) {
                        cancel_task = false;
                        task = null;
                        return false;
                    }
                    inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                    const ctx = {
                        inv_mass,
                        opts: spring,
                        settled: true,
                        dt: (now - last_time) * 60 / 1000
                    };
                    const next_value = tick_spring(ctx, last_value, value, target_value);
                    last_time = now;
                    last_value = value;
                    store.set(value = next_value);
                    if (ctx.settled) {
                        task = null;
                    }
                    return !ctx.settled;
                });
            }
            return new Promise(fulfil => {
                task.promise.then(() => {
                    if (token === current_token)
                        fulfil();
                });
            });
        }
        const spring = {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe,
            stiffness,
            damping,
            precision
        };
        return spring;
    }

    /* node_modules\svelte-parallax\src\ParallaxLayer.svelte generated by Svelte v3.46.4 */
    const file$2 = "node_modules\\svelte-parallax\\src\\ParallaxLayer.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	let div_levels = [
    		/*$$restProps*/ ctx[3],
    		{
    			class: div_class_value = "parallax-layer " + (/*$$restProps*/ ctx[3].class
    			? /*$$restProps*/ ctx[3].class
    			: '')
    		},
    		{
    			style: div_style_value = "height: " + /*height*/ ctx[0] + "px; -ms-transform: " + /*translate*/ ctx[1] + "; -webkit-transform: " + /*translate*/ ctx[1] + "; transform: " + /*translate*/ ctx[1] + "; " + (/*$$restProps*/ ctx[3].style
    			? /*$$restProps*/ ctx[3].style
    			: '') + ";"
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "svelte-qcp0z5", true);
    			add_location(div, file$2, 55, 0, 1437);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3],
    				(!current || dirty & /*$$restProps*/ 8 && div_class_value !== (div_class_value = "parallax-layer " + (/*$$restProps*/ ctx[3].class
    				? /*$$restProps*/ ctx[3].class
    				: ''))) && { class: div_class_value },
    				(!current || dirty & /*height, translate, $$restProps*/ 11 && div_style_value !== (div_style_value = "height: " + /*height*/ ctx[0] + "px; -ms-transform: " + /*translate*/ ctx[1] + "; -webkit-transform: " + /*translate*/ ctx[1] + "; transform: " + /*translate*/ ctx[1] + "; " + (/*$$restProps*/ ctx[3].style
    				? /*$$restProps*/ ctx[3].style
    				: '') + ";")) && { style: div_style_value }
    			]));

    			toggle_class(div, "svelte-qcp0z5", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
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
    	let translate;
    	const omit_props_names = ["rate","offset","span"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $coord;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ParallaxLayer', slots, ['default']);
    	let { rate = 0.5 } = $$props;
    	let { offset = 0 } = $$props;
    	let { span = 1 } = $$props;

    	// get context from Parallax
    	let { config, addLayer, removeLayer } = getContext(contextKey);

    	// spring store to hold changing scroll coordinate
    	const coord = spring(undefined, config);

    	validate_store(coord, 'coord');
    	component_subscribe($$self, coord, value => $$invalidate(7, $coord = value));

    	// layer height
    	let height;

    	const layer = {
    		setPosition: (scrollTop, innerHeight, disabled) => {
    			// amount to scroll before layer is at target position
    			const targetScroll = Math.floor(offset) * innerHeight;

    			// distance to target position
    			const distance = offset * innerHeight + targetScroll * rate;

    			const current = disabled
    			? offset * innerHeight
    			: -(scrollTop * rate) + distance;

    			coord.set(current, { hard: disabled });
    		},
    		setHeight: innerHeight => {
    			$$invalidate(0, height = span * innerHeight);
    		}
    	};

    	onMount(() => {
    		// register layer with parent
    		addLayer(layer);

    		return () => {
    			// clean up
    			removeLayer(layer);
    		};
    	});

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('rate' in $$new_props) $$invalidate(4, rate = $$new_props.rate);
    		if ('offset' in $$new_props) $$invalidate(5, offset = $$new_props.offset);
    		if ('span' in $$new_props) $$invalidate(6, span = $$new_props.span);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onMount,
    		spring,
    		contextKey,
    		rate,
    		offset,
    		span,
    		config,
    		addLayer,
    		removeLayer,
    		coord,
    		height,
    		layer,
    		translate,
    		$coord
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('rate' in $$props) $$invalidate(4, rate = $$new_props.rate);
    		if ('offset' in $$props) $$invalidate(5, offset = $$new_props.offset);
    		if ('span' in $$props) $$invalidate(6, span = $$new_props.span);
    		if ('config' in $$props) config = $$new_props.config;
    		if ('addLayer' in $$props) addLayer = $$new_props.addLayer;
    		if ('removeLayer' in $$props) removeLayer = $$new_props.removeLayer;
    		if ('height' in $$props) $$invalidate(0, height = $$new_props.height);
    		if ('translate' in $$props) $$invalidate(1, translate = $$new_props.translate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$coord*/ 128) {
    			// translate layer according to coordinate
    			$$invalidate(1, translate = `translate3d(0px, ${$coord}px, 0px);`);
    		}
    	};

    	return [
    		height,
    		translate,
    		coord,
    		$$restProps,
    		rate,
    		offset,
    		span,
    		$coord,
    		$$scope,
    		slots
    	];
    }

    class ParallaxLayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { rate: 4, offset: 5, span: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ParallaxLayer",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get rate() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rate(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get offset() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set offset(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get span() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set span(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    // (437:24) 
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
    			add_location(div0, file, 441, 4, 23150);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-10-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-10.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 442, 4, 23198);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-10");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 439, 4, 22920);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 448, 4, 23605);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-10-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-10.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 449, 4, 23655);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-10");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 446, 4, 23356);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 455, 4, 24056);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-10-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-10.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 456, 4, 24106);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-10");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 453, 4, 23810);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 462, 4, 24497);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-10-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-10.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 463, 4, 24542);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-10");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 460, 4, 24254);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 469, 4, 24881);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-10-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-10.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 470, 4, 24928);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-10");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 467, 4, 24689);
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
    		source: "(437:24) ",
    		ctx
    	});

    	return block;
    }

    // (401:24) 
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
    			add_location(div0, file, 405, 4, 20900);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-9-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-9.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 406, 4, 20948);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-9");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 403, 4, 20656);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 412, 4, 21366);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-9-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-9.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 413, 4, 21416);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-9");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 410, 4, 21103);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 419, 4, 21828);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-9-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-9.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 420, 4, 21878);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-9");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 417, 4, 21568);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 426, 4, 22280);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-9-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-9.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 427, 4, 22325);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-9");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 424, 4, 22023);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 433, 4, 22675);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-9-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-9.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 434, 4, 22722);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-9");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 431, 4, 22469);
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
    		source: "(401:24) ",
    		ctx
    	});

    	return block;
    }

    // (365:24) 
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
    			add_location(div0, file, 369, 4, 18638);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-8-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-8.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 370, 4, 18686);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-8");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 367, 4, 18394);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 376, 4, 19104);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-8-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-8.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 377, 4, 19154);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-8");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 374, 4, 18841);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 383, 4, 19566);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-8-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-8.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 384, 4, 19616);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-8");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 381, 4, 19306);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 390, 4, 20018);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-8-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-8.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 391, 4, 20063);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-8");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 388, 4, 19761);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 397, 4, 20413);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-8-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-8.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 398, 4, 20460);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-8");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 395, 4, 20207);
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
    		source: "(365:24) ",
    		ctx
    	});

    	return block;
    }

    // (329:24) 
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
    			add_location(div0, file, 333, 4, 16376);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-7-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-7.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 334, 4, 16424);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-7");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 331, 4, 16132);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 340, 4, 16842);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-7-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-7.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 341, 4, 16892);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-7");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 338, 4, 16579);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 347, 4, 17304);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-7-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-7.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 348, 4, 17354);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-7");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 345, 4, 17044);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 354, 4, 17756);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-7-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-7.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 355, 4, 17801);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-7");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 352, 4, 17499);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 361, 4, 18151);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-7-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-7.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 362, 4, 18198);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-7");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 359, 4, 17945);
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
    		source: "(329:24) ",
    		ctx
    	});

    	return block;
    }

    // (293:24) 
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
    			add_location(div0, file, 297, 4, 14114);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-6-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-6.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 298, 4, 14162);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-6");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 295, 4, 13870);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 304, 4, 14580);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-6-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-6.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 305, 4, 14630);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-6");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 302, 4, 14317);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 311, 4, 15042);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-6-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-6.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 312, 4, 15092);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-6");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 309, 4, 14782);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 318, 4, 15494);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-6-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-6.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 319, 4, 15539);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-6");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 316, 4, 15237);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 325, 4, 15889);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-6-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-6.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 326, 4, 15936);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-6");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 323, 4, 15683);
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
    		source: "(293:24) ",
    		ctx
    	});

    	return block;
    }

    // (255:24) 
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
    			add_location(div0, file, 259, 4, 11847);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-5-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-5.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 260, 4, 11895);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-5");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 257, 4, 11603);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 266, 4, 12313);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-5-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-5.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 267, 4, 12363);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-5");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 264, 4, 12050);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 273, 4, 12775);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-5-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-5.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 274, 4, 12825);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-5");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 271, 4, 12515);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 280, 4, 13227);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-5-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-5.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 281, 4, 13272);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-5");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 278, 4, 12970);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 287, 4, 13622);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-5-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-5.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 288, 4, 13669);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-5");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 285, 4, 13416);
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
    		source: "(255:24) ",
    		ctx
    	});

    	return block;
    }

    // (218:24) 
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
    			add_location(div0, file, 222, 4, 9581);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-4-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-4.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 223, 4, 9629);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-4");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 220, 4, 9337);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 229, 4, 10047);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-4-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-4.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 230, 4, 10097);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-4");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 227, 4, 9784);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 236, 4, 10509);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-4-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-4.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 237, 4, 10559);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-4");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 234, 4, 10249);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 243, 4, 10961);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-4-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-4.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 244, 4, 11006);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-4");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 241, 4, 10704);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 250, 4, 11356);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-4-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-4.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 251, 4, 11403);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-4");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 248, 4, 11150);
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
    		source: "(218:24) ",
    		ctx
    	});

    	return block;
    }

    // (180:24) 
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
    			add_location(div0, file, 184, 4, 7317);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-3-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-3.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 185, 4, 7365);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-3");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 182, 4, 7073);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 191, 4, 7783);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-3-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-3.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 192, 4, 7833);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-3");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 189, 4, 7520);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 198, 4, 8245);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-3-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-3.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 199, 4, 8295);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-3");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 196, 4, 7985);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 205, 4, 8697);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-3-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-3.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 206, 4, 8742);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-3");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 203, 4, 8440);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 212, 4, 9092);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-3-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-3.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 213, 4, 9139);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-3");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 210, 4, 8886);
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
    		source: "(180:24) ",
    		ctx
    	});

    	return block;
    }

    // (142:24) 
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
    			add_location(div0, file, 146, 4, 5053);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-2-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-2.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 147, 4, 5101);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-2");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 144, 4, 4809);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 153, 4, 5519);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-2-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-2.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 154, 4, 5569);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-2");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 151, 4, 5256);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 160, 4, 5981);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-2-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-2.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 161, 4, 6031);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-2");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 158, 4, 5721);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 167, 4, 6433);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-2-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-2.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 168, 4, 6478);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-2");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 165, 4, 6176);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 174, 4, 6828);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-2-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-2.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 175, 4, 6875);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-2");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 172, 4, 6622);
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
    		source: "(142:24) ",
    		ctx
    	});

    	return block;
    }

    // (104:3) {#if index == 0}
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
    			add_location(div0, file, 108, 4, 2789);
    			attr_dev(img0, "id", "g-Bisa-Ular-smallplus-1-img");
    			attr_dev(img0, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img0, "alt", "");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/Bisa-Ular-smallplus-1.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 109, 4, 2837);
    			attr_dev(div1, "id", "g-Bisa-Ular-smallplus-1");
    			attr_dev(div1, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div1, file, 106, 4, 2545);
    			set_style(div2, "padding", "0 0 156.8627% 0");
    			add_location(div2, file, 115, 4, 3255);
    			attr_dev(img1, "id", "g-Bisa-Ular-submedium-1-img");
    			attr_dev(img1, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img1, "alt", "");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/Bisa-Ular-submedium-1.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 116, 4, 3305);
    			attr_dev(div3, "id", "g-Bisa-Ular-submedium-1");
    			attr_dev(div3, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div3, file, 113, 4, 2992);
    			set_style(div4, "padding", "0 0 148.4058% 0");
    			add_location(div4, file, 122, 4, 3717);
    			attr_dev(img2, "id", "g-Bisa-Ular-medium-1-img");
    			attr_dev(img2, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img2, "alt", "");
    			if (!src_url_equal(img2.src, img2_src_value = "./images/Bisa-Ular-medium-1.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 123, 4, 3767);
    			attr_dev(div5, "id", "g-Bisa-Ular-medium-1");
    			attr_dev(div5, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div5, file, 120, 4, 3457);
    			set_style(div6, "padding", "0 0 100% 0");
    			add_location(div6, file, 129, 4, 4169);
    			attr_dev(img3, "id", "g-Bisa-Ular-large-1-img");
    			attr_dev(img3, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img3, "alt", "");
    			if (!src_url_equal(img3.src, img3_src_value = "./images/Bisa-Ular-large-1.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 130, 4, 4214);
    			attr_dev(div7, "id", "g-Bisa-Ular-large-1");
    			attr_dev(div7, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div7, file, 127, 4, 3912);
    			set_style(div8, "padding", "0 0 56.25% 0");
    			add_location(div8, file, 136, 4, 4564);
    			attr_dev(img4, "id", "g-Bisa-Ular-xlarge-1-img");
    			attr_dev(img4, "class", "g-aiImg svelte-zz8awn");
    			attr_dev(img4, "alt", "");
    			if (!src_url_equal(img4.src, img4_src_value = "./images/Bisa-Ular-xlarge-1.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 137, 4, 4611);
    			attr_dev(div9, "id", "g-Bisa-Ular-xlarge-1");
    			attr_dev(div9, "class", "g-artboard svelte-zz8awn");
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

    			add_location(div9, file, 134, 4, 4358);
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
    		source: "(104:3) {#if index == 0}",
    		ctx
    	});

    	return block;
    }

    // (101:2) 
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
    			attr_dev(div0, "class", "ai2html svelte-zz8awn");
    			add_location(div0, file, 101, 3, 2419);
    			attr_dev(div1, "slot", "background");
    			attr_dev(div1, "class", "svelte-zz8awn");
    			add_location(div1, file, 100, 2, 2392);
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
    		source: "(101:2) ",
    		ctx
    	});

    	return block;
    }

    // (477:2) 
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
    			attr_dev(section0, "class", "svelte-zz8awn");
    			add_location(section0, file, 477, 3, 25098);
    			attr_dev(p0, "class", "svelte-zz8awn");
    			add_location(p0, file, 479, 4, 25135);
    			attr_dev(section1, "class", "svelte-zz8awn");
    			add_location(section1, file, 478, 3, 25121);
    			add_location(em0, file, 485, 78, 25437);
    			add_location(em1, file, 485, 141, 25500);
    			attr_dev(p1, "class", "svelte-zz8awn");
    			add_location(p1, file, 484, 4, 25355);
    			attr_dev(section2, "class", "svelte-zz8awn");
    			add_location(section2, file, 483, 3, 25341);
    			attr_dev(p2, "class", "svelte-zz8awn");
    			add_location(p2, file, 489, 4, 25697);
    			attr_dev(section3, "class", "svelte-zz8awn");
    			add_location(section3, file, 488, 3, 25683);
    			attr_dev(p3, "class", "svelte-zz8awn");
    			add_location(p3, file, 494, 4, 25937);
    			attr_dev(section4, "class", "svelte-zz8awn");
    			add_location(section4, file, 493, 3, 25923);
    			attr_dev(p4, "class", "svelte-zz8awn");
    			add_location(p4, file, 499, 4, 26148);
    			attr_dev(section5, "class", "svelte-zz8awn");
    			add_location(section5, file, 498, 3, 26134);
    			attr_dev(p5, "class", "svelte-zz8awn");
    			add_location(p5, file, 504, 4, 26504);
    			attr_dev(section6, "class", "svelte-zz8awn");
    			add_location(section6, file, 503, 3, 26490);
    			attr_dev(p6, "class", "svelte-zz8awn");
    			add_location(p6, file, 509, 4, 26746);
    			attr_dev(section7, "class", "svelte-zz8awn");
    			add_location(section7, file, 508, 3, 26732);
    			attr_dev(p7, "class", "svelte-zz8awn");
    			add_location(p7, file, 514, 4, 27173);
    			attr_dev(section8, "class", "svelte-zz8awn");
    			add_location(section8, file, 513, 3, 27159);
    			attr_dev(p8, "class", "svelte-zz8awn");
    			add_location(p8, file, 519, 4, 27490);
    			attr_dev(section9, "class", "svelte-zz8awn");
    			add_location(section9, file, 518, 3, 27476);
    			attr_dev(p9, "class", "svelte-zz8awn");
    			add_location(p9, file, 524, 4, 27745);
    			attr_dev(section10, "class", "svelte-zz8awn");
    			add_location(section10, file, 523, 3, 27731);
    			attr_dev(div, "slot", "foreground");
    			attr_dev(div, "class", "svelte-zz8awn");
    			add_location(div, file, 476, 2, 25070);
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
    		source: "(477:2) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let meta;
    	let link0;
    	let link1;
    	let link2;
    	let link3;
    	let t0;
    	let main;
    	let head;
    	let updating_height;
    	let t1;
    	let header;
    	let div;
    	let t2;
    	let div0;
    	let t3;
    	let paragraph0;
    	let div_1;
    	let t4;
    	let scroller;
    	let updating_count;
    	let updating_index;
    	let updating_offset;
    	let updating_progress;
    	let t5;
    	let div1;
    	let t6;
    	let paragraph1;
    	let div_2;
    	let t7;
    	let credit_1;
    	let div_3;
    	let t8;
    	let foot;
    	let div_4;
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
    				title: "Dilema Anak Muda",
    				subtitle: "Menabung atau Tidak?",
    				subhead: /*subhead*/ ctx[16],
    				author: "Ann Putri",
    				date: "12 Mei 2022"
    			},
    			$$inline: true
    		});

    	paragraph0 = new Paragraph({
    			props: {
    				para: [
    					'Sejak kecil kita sudah dididik untuk menabung. Namun, peribahasa “hemat pangkal kaya” nampaknya tak lagi relevan.'
    				]
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

    	paragraph1 = new Paragraph({
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
    			meta = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			link3 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(head.$$.fragment);
    			t1 = space();
    			div = element("div");
    			create_component(header.$$.fragment);
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div_1 = element("div");
    			create_component(paragraph0.$$.fragment);
    			t4 = space();
    			create_component(scroller.$$.fragment);
    			t5 = space();
    			div1 = element("div");
    			t6 = space();
    			div_2 = element("div");
    			create_component(paragraph1.$$.fragment);
    			t7 = space();
    			div_3 = element("div");
    			create_component(credit_1.$$.fragment);
    			t8 = space();
    			div_4 = element("div");
    			create_component(foot.$$.fragment);
    			attr_dev(meta, "name", "viewport");
    			attr_dev(meta, "content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
    			add_location(meta, file, 49, 1, 1223);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file, 54, 1, 1341);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			attr_dev(link1, "crossorigin", "");
    			add_location(link1, file, 55, 1, 1402);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file, 56, 1, 1472);
    			attr_dev(link3, "href", "https://fonts.googleapis.com/css2?family=Koulen&display=swap");
    			attr_dev(link3, "rel", "stylesheet");
    			add_location(link3, file, 57, 1, 1570);
    			set_style(div, "display", "contents");
    			set_style(div, "--headerBackground", /*headerBackground*/ ctx[12]);
    			set_style(div, "--titleColor", /*titleColor*/ ctx[13]);
    			set_style(div, "--subtitleColor", /*subtitleColor*/ ctx[14]);
    			set_style(div, "--subheadColor", /*subheadColor*/ ctx[15]);
    			attr_dev(div0, "class", "divider svelte-zz8awn");
    			add_location(div0, file, 82, 1, 2082);
    			set_style(div_1, "display", "contents");
    			set_style(div_1, "--font-color", "#f9f9e1");
    			attr_dev(div1, "class", "divider svelte-zz8awn");
    			add_location(div1, file, 531, 1, 28019);
    			set_style(div_2, "display", "contents");
    			set_style(div_2, "--font-color", "#f9f9e1");
    			set_style(div_3, "display", "contents");
    			set_style(div_3, "--fontfamily1", /*fontfamily1*/ ctx[5]);
    			set_style(div_3, "--font-color", /*fontColor*/ ctx[6]);
    			set_style(div_4, "display", "contents");
    			set_style(div_4, "--fontfamily1", /*fontfamily1*/ ctx[5]);
    			set_style(div_4, "--font-color", /*fontColor*/ ctx[6]);
    			set_style(div_4, "--bgColorDark", /*colorBrandDarkBlue*/ ctx[7]);
    			set_style(main, "background-color", /*mainBackground*/ ctx[11]);
    			set_style(main, "padding-top", "3rem");
    			attr_dev(main, "class", "svelte-zz8awn");
    			add_location(main, file, 60, 0, 1678);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			append_dev(document.head, link3);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(head, main, null);
    			append_dev(main, t1);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(main, t2);
    			append_dev(main, div0);
    			append_dev(main, t3);
    			append_dev(main, div_1);
    			mount_component(paragraph0, div_1, null);
    			append_dev(main, t4);
    			mount_component(scroller, main, null);
    			append_dev(main, t5);
    			append_dev(main, div1);
    			append_dev(main, t6);
    			append_dev(main, div_2);
    			mount_component(paragraph1, div_2, null);
    			append_dev(main, t7);
    			append_dev(main, div_3);
    			mount_component(credit_1, div_3, null);
    			append_dev(main, t8);
    			append_dev(main, div_4);
    			mount_component(foot, div_4, null);
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
    			transition_in(paragraph0.$$.fragment, local);
    			transition_in(scroller.$$.fragment, local);
    			transition_in(paragraph1.$$.fragment, local);
    			transition_in(credit_1.$$.fragment, local);
    			transition_in(foot.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			transition_out(paragraph0.$$.fragment, local);
    			transition_out(scroller.$$.fragment, local);
    			transition_out(paragraph1.$$.fragment, local);
    			transition_out(credit_1.$$.fragment, local);
    			transition_out(foot.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta);
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			detach_dev(link3);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(head);
    			destroy_component(header);
    			destroy_component(paragraph0);
    			destroy_component(scroller);
    			destroy_component(paragraph1);
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
    	let fontColor = 'hsl(207, 100%, 69%)';

    	//Secondary Dark Color
    	let colorBrandDarkBlue = "#242053";

    	// scroller variables
    	let count, index, offset, progress;

    	let top = 0;
    	let threshold = 0;
    	let bottom = 1;

    	// styling variables
    	let mainBackground = 'white';

    	let headerBackground = 'white';
    	let titleColor = 'hsl(207, 100%, 25%)';
    	let subtitleColor = 'hsl(207, 100%, 25%)';
    	let subheadColor = 'hsl(207, 100%, 25%)';
    	let height;

    	let subhead = [
    		'Sejak kecil kita sudah dididik untuk menabung. Namun, peribahasa “hemat pangkal kaya” nampaknya tak lagi relevan.'
    	];

    	let credit = [{ role: 'Penulis', name: 'Ann Putri' }];
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
    		Parallax,
    		ParallaxLayer,
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
