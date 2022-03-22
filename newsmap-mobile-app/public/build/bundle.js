
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
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
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
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

    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function quintInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }

    const subscriber_queue = [];
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

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

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
      }

      loop(now => {
        if (!started && now >= start_time) {
          start(false);
        }

        if (started && now >= end_time) {
          tick(1);
          stop();
          onDone(element, {x, y});
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

    const scrollContainerHeight = containerElement => {
      if (
        containerElement &&
        containerElement !== document &&
        containerElement !== document.body
      ) {
        return containerElement.scrollHeight - containerElement.offsetHeight;
      } else {
        let body = document.body;
        let html = document.documentElement;

        return Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
      }
    };

    const setGlobalOptions = options => {
    	_.extend(defaultOptions, options || {});
    };

    const scrollTo = options => {
      return _scrollTo(proceedOptions(options));
    };

    const scrollToBottom = options => {
      options = proceedOptions(options);

      return _scrollTo(
        _.extend(options, {
          element: null,
          y: scrollContainerHeight(options.container)
        })
      );
    };

    const scrollToTop = options => {
      options = proceedOptions(options);

      return _scrollTo(
        _.extend(options, {
          element: null,
          y: 0
        })
      );
    };

    const makeScrollToAction = scrollToFunc => {
      return (node, options) => {
        let current = options;
        const handle = e => {
          e.preventDefault();
          scrollToFunc(
            typeof current === "string" ? { element: current } : current
          );
        };
        node.addEventListener("click", handle);
        node.addEventListener("touchstart", handle);
        return {
          update(options) {
            current = options;
          },
          destroy() {
            node.removeEventListener("click", handle);
            node.removeEventListener("touchstart", handle);
          }
        };
      };
    };

    const scrollto = makeScrollToAction(scrollTo);
    const scrolltotop = makeScrollToAction(scrollToTop);
    const scrolltobottom = makeScrollToAction(scrollToBottom);

    var animateScroll = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setGlobalOptions: setGlobalOptions,
        scrollTo: scrollTo,
        scrollToBottom: scrollToBottom,
        scrollToTop: scrollToTop,
        makeScrollToAction: makeScrollToAction,
        scrollto: scrollto,
        scrolltotop: scrolltotop,
        scrolltobottom: scrolltobottom
    });

    /* src\Header.svelte generated by Svelte v3.46.4 */
    const file$9 = "src\\Header.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[16] = i;
    	return child_ctx;
    }

    // (54:16) {#each menus as list, key}
    function create_each_block$6(ctx) {
    	let h4;
    	let t0_value = /*list*/ ctx[14].menu + "";
    	let t0;
    	let t1;
    	let h4_id_value;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[9](/*key*/ ctx[16]);
    	}

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(h4, "class", "menu svelte-1gh0swr");
    			attr_dev(h4, "id", h4_id_value = /*list*/ ctx[14].id);
    			toggle_class(h4, "selected", /*list*/ ctx[14].active === true);
    			add_location(h4, file$9, 54, 20, 1608);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t0);
    			append_dev(h4, t1);

    			if (!mounted) {
    				dispose = listen_dev(h4, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*menus*/ 2 && t0_value !== (t0_value = /*list*/ ctx[14].menu + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*menus*/ 2 && h4_id_value !== (h4_id_value = /*list*/ ctx[14].id)) {
    				attr_dev(h4, "id", h4_id_value);
    			}

    			if (dirty & /*menus*/ 2) {
    				toggle_class(h4, "selected", /*list*/ ctx[14].active === true);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(54:16) {#each menus as list, key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let nav;
    	let div6;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div5;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let div6_resize_listener;
    	let each_value = /*menus*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div6 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div5 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			if (!src_url_equal(img.src, img_src_value = "./image/logo-jurno-web.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Logo Jurno Website");
    			attr_dev(img, "class", "svelte-1gh0swr");
    			add_location(img, file$9, 49, 12, 1390);
    			attr_dev(div0, "class", "header-logo svelte-1gh0swr");
    			add_location(div0, file$9, 48, 8, 1351);
    			attr_dev(div1, "class", "headertext svelte-1gh0swr");
    			add_location(div1, file$9, 52, 12, 1518);
    			attr_dev(div2, "class", "bar svelte-1gh0swr");
    			set_style(div2, "left", /*$barPosition1*/ ctx[2] * 25 + 8.5 + "vw");
    			add_location(div2, file$9, 63, 12, 1932);
    			attr_dev(div3, "class", "bar svelte-1gh0swr");
    			set_style(div3, "left", /*$barPosition2*/ ctx[3] * 25 + 8.5 + "vw");
    			add_location(div3, file$9, 64, 12, 2007);
    			attr_dev(div4, "class", "bar svelte-1gh0swr");
    			set_style(div4, "left", /*$barPosition3*/ ctx[4] * 25 + 8.5 + "vw");
    			add_location(div4, file$9, 65, 12, 2082);
    			attr_dev(div5, "class", "header-menu svelte-1gh0swr");
    			add_location(div5, file$9, 51, 8, 1479);
    			attr_dev(div6, "class", "container svelte-1gh0swr");
    			add_render_callback(() => /*div6_elementresize_handler*/ ctx[10].call(div6));
    			add_location(div6, file$9, 47, 4, 1291);
    			add_location(nav, file$9, 46, 0, 1280);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div6);
    			append_dev(div6, div0);
    			append_dev(div0, img);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div5, t1);
    			append_dev(div5, div2);
    			append_dev(div5, t2);
    			append_dev(div5, div3);
    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			div6_resize_listener = add_resize_listener(div6, /*div6_elementresize_handler*/ ctx[10].bind(div6));
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*menus, menuClick*/ 258) {
    				each_value = /*menus*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*$barPosition1*/ 4) {
    				set_style(div2, "left", /*$barPosition1*/ ctx[2] * 25 + 8.5 + "vw");
    			}

    			if (dirty & /*$barPosition2*/ 8) {
    				set_style(div3, "left", /*$barPosition2*/ ctx[3] * 25 + 8.5 + "vw");
    			}

    			if (dirty & /*$barPosition3*/ 16) {
    				set_style(div4, "left", /*$barPosition3*/ ctx[4] * 25 + 8.5 + "vw");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_each(each_blocks, detaching);
    			div6_resize_listener();
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
    	let $barPosition1;
    	let $barPosition2;
    	let $barPosition3;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { height } = $$props;
    	const tweenConfig1 = { duration: 500, easing: cubicInOut };

    	const tweenConfig2 = {
    		duration: 500,
    		easing: cubicInOut,
    		delay: 20
    	};

    	const tweenConfig3 = {
    		duration: 500,
    		easing: cubicInOut,
    		delay: 40
    	};

    	const barPosition1 = tweened(0, tweenConfig1);
    	validate_store(barPosition1, 'barPosition1');
    	component_subscribe($$self, barPosition1, value => $$invalidate(2, $barPosition1 = value));
    	const barPosition2 = tweened(0, tweenConfig2);
    	validate_store(barPosition2, 'barPosition2');
    	component_subscribe($$self, barPosition2, value => $$invalidate(3, $barPosition2 = value));
    	const barPosition3 = tweened(0, tweenConfig3);
    	validate_store(barPosition3, 'barPosition3');
    	component_subscribe($$self, barPosition3, value => $$invalidate(4, $barPosition3 = value));

    	let menus = [
    		{
    			menu: 'Jurno',
    			id: 0,
    			active: true,
    			link: "#jurno"
    		},
    		{
    			menu: 'Original',
    			id: 1,
    			active: false,
    			link: "#original"
    		},
    		{
    			menu: 'Deduktif',
    			id: 2,
    			active: false,
    			link: "#deduktif"
    		},
    		{
    			menu: 'Podcast',
    			id: 3,
    			active: false,
    			link: "#podcast"
    		}
    	];

    	const menuClick = id => {
    		menus.forEach(menu => {
    			menu.active = false;
    		});

    		$$invalidate(1, menus[id].active = true, menus);
    		scrollTo({ element: menus[id].link, offset: -150 });
    		barPosition1.set(id);
    		barPosition2.set(id);
    		barPosition3.set(id);
    	};

    	const writable_props = ['height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = key => {
    		menuClick(key);
    	};

    	function div6_elementresize_handler() {
    		height = this.clientHeight;
    		$$invalidate(0, height);
    	}

    	$$self.$$set = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({
    		cubicInOut,
    		quintInOut,
    		tweened,
    		animateScroll,
    		height,
    		tweenConfig1,
    		tweenConfig2,
    		tweenConfig3,
    		barPosition1,
    		barPosition2,
    		barPosition3,
    		menus,
    		menuClick,
    		$barPosition1,
    		$barPosition2,
    		$barPosition3
    	});

    	$$self.$inject_state = $$props => {
    		if ('height' in $$props) $$invalidate(0, height = $$props.height);
    		if ('menus' in $$props) $$invalidate(1, menus = $$props.menus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		height,
    		menus,
    		$barPosition1,
    		$barPosition2,
    		$barPosition3,
    		barPosition1,
    		barPosition2,
    		barPosition3,
    		menuClick,
    		click_handler,
    		div6_elementresize_handler
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { height: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*height*/ ctx[0] === undefined && !('height' in props)) {
    			console.warn("<Header> was created without expected prop 'height'");
    		}
    	}

    	get height() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Newsmap.svelte generated by Svelte v3.46.4 */

    const file$8 = "src\\Newsmap.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (18:12) {:catch error}
    function create_catch_block_3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$8, 18, 16, 532);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_3.name,
    		type: "catch",
    		source: "(18:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (16:12) {:then data}
    function create_then_block_3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "imggrid svelte-1fgwnog");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][0].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][0].title);
    			add_location(img, file$8, 16, 16, 425);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block_3.name,
    		type: "then",
    		source: "(16:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (14:31)                   <p>...waiting</p>              {:then data}
    function create_pending_block_3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$8, 14, 16, 364);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_3.name,
    		type: "pending",
    		source: "(14:31)                   <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    // (31:12) {:catch error}
    function create_catch_block_2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$8, 31, 16, 994);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_2.name,
    		type: "catch",
    		source: "(31:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (25:12) {:then data}
    function create_then_block_2(ctx) {
    	let each_1_anchor;
    	let each_value_2 = { length: 4 };
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
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
    			if (dirty & /*fetchImage*/ 2) {
    				each_value_2 = { length: 4 };
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block_2.name,
    		type: "then",
    		source: "(25:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (26:16) {#each {length: 4} as _, i}
    function create_each_block_2(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "imggrid svelte-1fgwnog");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][/*i*/ ctx[5] + 1].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][/*i*/ ctx[5] + 1].title);
    			add_location(img, file$8, 27, 24, 830);
    			attr_dev(div, "class", "grid4 svelte-1fgwnog");
    			add_location(div, file$8, 26, 20, 785);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(26:16) {#each {length: 4} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (23:31)                   <p>...waiting</p>              {:then data}
    function create_pending_block_2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$8, 23, 16, 675);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_2.name,
    		type: "pending",
    		source: "(23:31)                   <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    // (44:12) {:catch error}
    function create_catch_block_1$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$8, 44, 16, 1456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_1$1.name,
    		type: "catch",
    		source: "(44:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (38:12) {:then data}
    function create_then_block_1$1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = { length: 4 };
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
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
    			if (dirty & /*fetchImage*/ 2) {
    				each_value_1 = { length: 4 };
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
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
    		id: create_then_block_1$1.name,
    		type: "then",
    		source: "(38:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (39:16) {#each {length: 4} as _, i}
    function create_each_block_1$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "imggrid svelte-1fgwnog");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][/*i*/ ctx[5] + 5].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][/*i*/ ctx[5] + 5].title);
    			add_location(img, file$8, 40, 24, 1292);
    			attr_dev(div, "class", "grid4 svelte-1fgwnog");
    			add_location(div, file$8, 39, 20, 1247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(39:16) {#each {length: 4} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (36:31)                   <p>...waiting</p>              {:then data}
    function create_pending_block_1$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$8, 36, 16, 1137);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_1$1.name,
    		type: "pending",
    		source: "(36:31)                   <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    // (57:12) {:catch error}
    function create_catch_block$4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$8, 57, 16, 1918);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$4.name,
    		type: "catch",
    		source: "(57:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (51:12) {:then data}
    function create_then_block$4(ctx) {
    	let each_1_anchor;
    	let each_value = { length: 9 };
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
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
    			if (dirty & /*fetchImage*/ 2) {
    				each_value = { length: 9 };
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$4.name,
    		type: "then",
    		source: "(51:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (52:16) {#each {length: 9} as _, i}
    function create_each_block$5(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "imggrid svelte-1fgwnog");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][/*i*/ ctx[5] + 9].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][/*i*/ ctx[5] + 9].title);
    			add_location(img, file$8, 53, 24, 1754);
    			attr_dev(div, "class", "grid9 svelte-1fgwnog");
    			add_location(div, file$8, 52, 20, 1709);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(52:16) {#each {length: 9} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (49:31)                   <p>...waiting</p>              {:then data}
    function create_pending_block$4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$8, 49, 16, 1599);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$4.name,
    		type: "pending",
    		source: "(49:31)                   <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let article;
    	let div4;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block_3,
    		then: create_then_block_3,
    		catch: create_catch_block_3,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info);

    	let info_1 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block_2,
    		then: create_then_block_2,
    		catch: create_catch_block_2,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info_1);

    	let info_2 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block_1$1,
    		then: create_then_block_1$1,
    		catch: create_catch_block_1$1,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info_2);

    	let info_3 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$4,
    		then: create_then_block$4,
    		catch: create_catch_block$4,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info_3);

    	const block = {
    		c: function create() {
    			article = element("article");
    			div4 = element("div");
    			div0 = element("div");
    			info.block.c();
    			t0 = space();
    			div1 = element("div");
    			info_1.block.c();
    			t1 = space();
    			div2 = element("div");
    			info_2.block.c();
    			t2 = space();
    			div3 = element("div");
    			info_3.block.c();
    			attr_dev(div0, "class", "grid1 svelte-1fgwnog");
    			add_location(div0, file$8, 12, 8, 294);
    			attr_dev(div1, "class", "grid1 svelte-1fgwnog");
    			add_location(div1, file$8, 21, 8, 605);
    			attr_dev(div2, "class", "grid1 svelte-1fgwnog");
    			add_location(div2, file$8, 34, 8, 1067);
    			attr_dev(div3, "class", "grid1 svelte-1fgwnog");
    			add_location(div3, file$8, 47, 8, 1529);
    			attr_dev(div4, "class", "grid svelte-1fgwnog");
    			add_location(div4, file$8, 11, 4, 266);
    			set_style(article, "margin-top", /*margin*/ ctx[0] + "px");
    			attr_dev(article, "id", "jurno");
    			attr_dev(article, "class", "svelte-1fgwnog");
    			add_location(article, file$8, 10, 0, 210);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div4);
    			append_dev(div4, div0);
    			info.block.m(div0, info.anchor = null);
    			info.mount = () => div0;
    			info.anchor = null;
    			append_dev(div4, t0);
    			append_dev(div4, div1);
    			info_1.block.m(div1, info_1.anchor = null);
    			info_1.mount = () => div1;
    			info_1.anchor = null;
    			append_dev(div4, t1);
    			append_dev(div4, div2);
    			info_2.block.m(div2, info_2.anchor = null);
    			info_2.mount = () => div2;
    			info_2.anchor = null;
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			info_3.block.m(div3, info_3.anchor = null);
    			info_3.mount = () => div3;
    			info_3.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    			update_await_block_branch(info_1, ctx, dirty);
    			update_await_block_branch(info_2, ctx, dirty);
    			update_await_block_branch(info_3, ctx, dirty);

    			if (dirty & /*margin*/ 1) {
    				set_style(article, "margin-top", /*margin*/ ctx[0] + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			info.block.d();
    			info.token = null;
    			info = null;
    			info_1.block.d();
    			info_1.token = null;
    			info_1 = null;
    			info_2.block.d();
    			info_2.token = null;
    			info_2 = null;
    			info_3.block.d();
    			info_3.token = null;
    			info_3 = null;
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
    	validate_slots('Newsmap', slots, []);

    	const fetchImage = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    		return await response.json();
    	})();

    	let { margin } = $$props;
    	const writable_props = ['margin'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Newsmap> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('margin' in $$props) $$invalidate(0, margin = $$props.margin);
    	};

    	$$self.$capture_state = () => ({ fetchImage, margin });

    	$$self.$inject_state = $$props => {
    		if ('margin' in $$props) $$invalidate(0, margin = $$props.margin);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [margin, fetchImage];
    }

    class Newsmap extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { margin: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Newsmap",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*margin*/ ctx[0] === undefined && !('margin' in props)) {
    			console.warn("<Newsmap> was created without expected prop 'margin'");
    		}
    	}

    	get margin() {
    		throw new Error("<Newsmap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set margin(value) {
    		throw new Error("<Newsmap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\NewsmapOriginal.svelte generated by Svelte v3.46.4 */

    const file$7 = "src\\NewsmapOriginal.svelte";

    function create_fragment$8(ctx) {
    	let div4;
    	let p;
    	let t1;
    	let div3;
    	let div2;
    	let div0;
    	let t3;
    	let div1;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			p = element("p");
    			p.textContent = "JURNO ORIGINAL";
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Original Newsmap";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "Kenapa Bimbel Bisa Booming Banget";
    			attr_dev(p, "class", "title svelte-18p8q9g");
    			add_location(p, file$7, 5, 4, 68);
    			attr_dev(div0, "class", "sub-title svelte-18p8q9g");
    			add_location(div0, file$7, 8, 12, 175);
    			attr_dev(div1, "class", "card-title svelte-18p8q9g");
    			add_location(div1, file$7, 9, 12, 234);
    			attr_dev(div2, "class", "inner-card svelte-18p8q9g");
    			add_location(div2, file$7, 7, 8, 137);
    			attr_dev(div3, "class", "card svelte-18p8q9g");
    			add_location(div3, file$7, 6, 4, 109);
    			attr_dev(div4, "class", "container");
    			attr_dev(div4, "id", "original");
    			add_location(div4, file$7, 4, 0, 25);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, p);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
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

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NewsmapOriginal', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NewsmapOriginal> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class NewsmapOriginal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NewsmapOriginal",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\Sentiment.svelte generated by Svelte v3.46.4 */

    const file$6 = "src\\Sentiment.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (18:8) {:catch error}
    function create_catch_block$3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$6, 18, 12, 557);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$3.name,
    		type: "catch",
    		source: "(18:8) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (12:8) {:then data}
    function create_then_block$3(ctx) {
    	let each_1_anchor;
    	let each_value = { length: 10 };
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
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
    			if (dirty & /*fetchImage*/ 1) {
    				each_value = { length: 10 };
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$3.name,
    		type: "then",
    		source: "(12:8) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (13:12) {#each {length: 10} as _, i}
    function create_each_block$4(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "people svelte-1nwnlwr");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[1][/*i*/ ctx[4]].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[1][/*i*/ ctx[4]].title);
    			add_location(img, file$6, 14, 20, 414);
    			attr_dev(div, "class", "sentiment svelte-1nwnlwr");
    			add_location(div, file$6, 13, 16, 369);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(13:12) {#each {length: 10} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (10:27)           <p>...waiting</p>          {:then data}
    function create_pending_block$3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$6, 10, 8, 270);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$3.name,
    		type: "pending",
    		source: "(10:27)           <p>...waiting</p>          {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div1;
    	let div0;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$3,
    		then: create_then_block$3,
    		catch: create_catch_block$3,
    		value: 1,
    		error: 5
    	};

    	handle_promise(/*fetchImage*/ ctx[0], info);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			info.block.c();
    			attr_dev(div0, "class", "slider svelte-1nwnlwr");
    			add_location(div0, file$6, 8, 4, 211);
    			attr_dev(div1, "class", "container svelte-1nwnlwr");
    			add_location(div1, file$6, 7, 0, 182);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			info.block.m(div0, info.anchor = null);
    			info.mount = () => div0;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			info.block.d();
    			info.token = null;
    			info = null;
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
    	validate_slots('Sentiment', slots, []);

    	const fetchImage = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    		return await response.json();
    	})();

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sentiment> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fetchImage });
    	return [fetchImage];
    }

    class Sentiment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sentiment",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\Deduktif.svelte generated by Svelte v3.46.4 */

    const file$5 = "src\\Deduktif.svelte";

    function create_fragment$6(ctx) {
    	let div12;
    	let div11;
    	let div10;
    	let div4;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div3;
    	let div2;
    	let t2;
    	let div9;
    	let div8;
    	let div7;
    	let div5;
    	let t4;
    	let div6;
    	let t6;
    	let p;

    	const block = {
    		c: function create() {
    			div12 = element("div");
    			div11 = element("div");
    			div10 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div2.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo doloribus maxime exercitationem, distinctio est aperiam eveniet ullam assumenda quae corporis voluptatum quasi consequuntur impedit! Quaerat?";
    			t2 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div5 = element("div");
    			div5.textContent = "oleh Ahsan Ridhoi";
    			t4 = space();
    			div6 = element("div");
    			div6.textContent = "Lorem Ipsum Dolor Sit Amet";
    			t6 = space();
    			p = element("p");
    			p.textContent = "DEDUKTIF";
    			attr_dev(img, "class", "authorprofile svelte-11y9vrb");
    			if (!src_url_equal(img.src, img_src_value = "https://via.placeholder.com/600/24f355")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "author profile");
    			add_location(img, file$5, 10, 24, 262);
    			attr_dev(div0, "class", "profile svelte-11y9vrb");
    			add_location(div0, file$5, 9, 20, 215);
    			attr_dev(div1, "class", "left svelte-11y9vrb");
    			add_location(div1, file$5, 8, 16, 175);
    			attr_dev(div2, "class", "excerpt svelte-11y9vrb");
    			add_location(div2, file$5, 14, 20, 466);
    			attr_dev(div3, "class", "right svelte-11y9vrb");
    			add_location(div3, file$5, 13, 16, 425);
    			attr_dev(div4, "class", "contentbot svelte-11y9vrb");
    			add_location(div4, file$5, 7, 12, 133);
    			attr_dev(div5, "class", "author svelte-11y9vrb");
    			add_location(div5, file$5, 22, 24, 955);
    			attr_dev(div6, "class", "title svelte-11y9vrb");
    			add_location(div6, file$5, 23, 24, 1024);
    			attr_dev(div7, "class", "detail svelte-11y9vrb");
    			add_location(div7, file$5, 21, 20, 909);
    			attr_dev(div8, "class", "headline svelte-11y9vrb");
    			add_location(div8, file$5, 20, 16, 865);
    			attr_dev(div9, "class", "contenttop");
    			add_location(div9, file$5, 19, 12, 823);
    			attr_dev(div10, "class", "content svelte-11y9vrb");
    			add_location(div10, file$5, 6, 8, 98);
    			attr_dev(div11, "class", "bottom svelte-11y9vrb");
    			add_location(div11, file$5, 5, 4, 68);
    			attr_dev(p, "class", "deduktif svelte-11y9vrb");
    			add_location(p, file$5, 29, 4, 1184);
    			attr_dev(div12, "class", "container svelte-11y9vrb");
    			attr_dev(div12, "id", "deduktif");
    			add_location(div12, file$5, 4, 0, 25);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div10, t2);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div7, t4);
    			append_dev(div7, div6);
    			append_dev(div12, t6);
    			append_dev(div12, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div12);
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

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Deduktif', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Deduktif> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Deduktif extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Deduktif",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\News.svelte generated by Svelte v3.46.4 */

    const file$4 = "src\\News.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (24:12) {:catch error}
    function create_catch_block$2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$4, 24, 16, 813);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$2.name,
    		type: "catch",
    		source: "(24:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (16:12) {:then data}
    function create_then_block$2(ctx) {
    	let each_1_anchor;
    	let each_value = { length: 10 };
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
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
    			if (dirty & /*fetchImage*/ 2) {
    				each_value = { length: 10 };
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$2.name,
    		type: "then",
    		source: "(16:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (17:16) {#each {length: 10} as _, i}
    function create_each_block$3(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let p0;
    	let t2;
    	let p1;
    	let t3_value = /*data*/ ctx[2][/*i*/ ctx[5]].title + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Author";
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(img, "class", "imgthumb svelte-4j48tv");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][/*i*/ ctx[5]].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][/*i*/ ctx[5]].title);
    			add_location(img, file$4, 18, 24, 528);
    			attr_dev(p0, "class", "author svelte-4j48tv");
    			add_location(p0, file$4, 19, 24, 616);
    			attr_dev(p1, "class", "article-title svelte-4j48tv");
    			add_location(p1, file$4, 20, 24, 670);
    			attr_dev(div, "class", "news svelte-4j48tv");
    			add_location(div, file$4, 17, 20, 484);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, p0);
    			append_dev(div, t2);
    			append_dev(div, p1);
    			append_dev(p1, t3);
    			append_dev(div, t4);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(17:16) {#each {length: 10} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (14:31)               <p>...waiting</p>              {:then data}
    function create_pending_block$2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$4, 14, 12, 373);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$2.name,
    		type: "pending",
    		source: "(14:31)               <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div2;
    	let p;
    	let t0;
    	let t1;
    	let div1;
    	let div0;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$2,
    		then: create_then_block$2,
    		catch: create_catch_block$2,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			p = element("p");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			info.block.c();
    			attr_dev(p, "class", "title svelte-4j48tv");
    			add_location(p, file$4, 10, 4, 232);
    			attr_dev(div0, "class", "slider svelte-4j48tv");
    			add_location(div0, file$4, 12, 8, 306);
    			attr_dev(div1, "class", "slider-container svelte-4j48tv");
    			add_location(div1, file$4, 11, 4, 266);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$4, 9, 0, 203);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, p);
    			append_dev(p, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			info.block.m(div0, info.anchor = null);
    			info.mount = () => div0;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			info.block.d();
    			info.token = null;
    			info = null;
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
    	validate_slots('News', slots, []);
    	let { title = '' } = $$props;

    	const fetchImage = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    		return await response.json();
    	})();

    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<News> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title, fetchImage });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, fetchImage];
    }

    class News extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "News",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get title() {
    		throw new Error("<News>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<News>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Podcast.svelte generated by Svelte v3.46.4 */

    const file$3 = "src\\Podcast.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (28:12) {:catch error}
    function create_catch_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$3, 28, 16, 913);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block_1.name,
    		type: "catch",
    		source: "(28:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (22:12) {:then data}
    function create_then_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = { length: 2 };
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
    			if (dirty & /*fetchImage*/ 1) {
    				each_value_1 = { length: 2 };
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
    		id: create_then_block_1.name,
    		type: "then",
    		source: "(22:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (23:16) {#each {length: 2} as _, i}
    function create_each_block_1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "imgpod svelte-11fq9lb");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][/*i*/ ctx[5]].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][/*i*/ ctx[5]].title);
    			add_location(img, file$3, 24, 24, 754);
    			attr_dev(div, "class", "podcast svelte-11fq9lb");
    			add_location(div, file$3, 23, 20, 707);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(23:16) {#each {length: 2} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (20:31)               <p>...waiting</p>              {:then data}
    function create_pending_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$3, 20, 12, 597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block_1.name,
    		type: "pending",
    		source: "(20:31)               <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    // (47:12) {:catch error}
    function create_catch_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$3, 47, 16, 1682);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$1.name,
    		type: "catch",
    		source: "(47:12) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (36:12) {:then data}
    function create_then_block$1(ctx) {
    	let each_1_anchor;
    	let each_value = { length: 10 };
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
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
    			if (dirty & /*fetchImage*/ 1) {
    				each_value = { length: 10 };
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$1.name,
    		type: "then",
    		source: "(36:12) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (37:16) {#each {length: 10} as _, i}
    function create_each_block$2(ctx) {
    	let div5;
    	let div0;
    	let i_1;
    	let t0;
    	let div3;
    	let div1;
    	let t1_value = /*data*/ ctx[2][/*i*/ ctx[5]].title + "";
    	let t1;
    	let t2;
    	let div2;
    	let t3;
    	let div4;
    	let t5;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			i_1 = element("i");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = space();
    			div4 = element("div");
    			div4.textContent = "15.00";
    			t5 = space();
    			attr_dev(i_1, "class", "fa fa-play");
    			add_location(i_1, file$3, 38, 42, 1279);
    			attr_dev(div0, "class", "play svelte-11fq9lb");
    			add_location(div0, file$3, 38, 24, 1261);
    			attr_dev(div1, "class", "podtitle");
    			add_location(div1, file$3, 40, 28, 1390);
    			attr_dev(div2, "class", "podauthor");
    			add_location(div2, file$3, 41, 28, 1463);
    			attr_dev(div3, "class", "poddetail svelte-11fq9lb");
    			add_location(div3, file$3, 39, 24, 1337);
    			attr_dev(div4, "class", "duration svelte-11fq9lb");
    			add_location(div4, file$3, 43, 24, 1550);
    			attr_dev(div5, "class", "podlist svelte-11fq9lb");
    			add_location(div5, file$3, 37, 20, 1214);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, i_1);
    			append_dev(div5, t0);
    			append_dev(div5, div3);
    			append_dev(div3, div1);
    			append_dev(div1, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			append_dev(div5, t5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(37:16) {#each {length: 10} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (34:31)               <p>...waiting</p>              {:then data}
    function create_pending_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$3, 34, 12, 1103);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$1.name,
    		type: "pending",
    		source: "(34:31)               <p>...waiting</p>              {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div4;
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let div3;
    	let div1;
    	let t4;
    	let p2;
    	let t6;
    	let div2;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block_1,
    		then: create_then_block_1,
    		catch: create_catch_block_1,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[0], info);

    	let info_1 = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$1,
    		then: create_then_block$1,
    		catch: create_catch_block$1,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[0], info_1);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "PODCAST";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "View all";
    			t3 = space();
    			div3 = element("div");
    			div1 = element("div");
    			info.block.c();
    			t4 = space();
    			p2 = element("p");
    			p2.textContent = "Playlist";
    			t6 = space();
    			div2 = element("div");
    			info_1.block.c();
    			attr_dev(p0, "class", "title svelte-11fq9lb");
    			add_location(p0, file$3, 14, 8, 415);
    			attr_dev(p1, "class", "viewall svelte-11fq9lb");
    			add_location(p1, file$3, 15, 8, 453);
    			attr_dev(div0, "class", "title-container svelte-11fq9lb");
    			add_location(div0, file$3, 13, 4, 376);
    			attr_dev(div1, "class", "album svelte-11fq9lb");
    			add_location(div1, file$3, 18, 8, 531);
    			attr_dev(p2, "class", "playlist-title svelte-11fq9lb");
    			add_location(p2, file$3, 31, 8, 986);
    			attr_dev(div2, "class", "playlist svelte-11fq9lb");
    			add_location(div2, file$3, 32, 8, 1034);
    			attr_dev(div3, "class", "inner svelte-11fq9lb");
    			add_location(div3, file$3, 17, 4, 502);
    			attr_dev(div4, "class", "container");
    			attr_dev(div4, "id", "podcast");
    			add_location(div4, file$3, 12, 0, 334);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			info.block.m(div1, info.anchor = null);
    			info.mount = () => div1;
    			info.anchor = null;
    			append_dev(div3, t4);
    			append_dev(div3, p2);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			info_1.block.m(div2, info_1.anchor = null);
    			info_1.mount = () => div2;
    			info_1.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    			update_await_block_branch(info_1, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			info.block.d();
    			info.token = null;
    			info = null;
    			info_1.block.d();
    			info_1.token = null;
    			info_1 = null;
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
    	validate_slots('Podcast', slots, []);

    	const fetchImage = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    		return await response.json();
    	})();

    	const fetchPlaylist = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    		return await response.json();
    	})();

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Podcast> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fetchImage, fetchPlaylist });
    	return [fetchImage];
    }

    class Podcast extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Podcast",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Menu.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\Menu.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (20:8) {#each menus as list, key}
    function create_each_block$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let h4;
    	let t1_value = /*list*/ ctx[2].menu + "";
    	let t1;
    	let h4_id_value;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			h4 = element("h4");
    			t1 = text(t1_value);
    			t2 = space();
    			if (!src_url_equal(img.src, img_src_value = "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1ruhryj");
    			add_location(img, file$2, 21, 12, 627);
    			attr_dev(h4, "class", "menutext svelte-1ruhryj");
    			attr_dev(h4, "id", h4_id_value = /*list*/ ctx[2].id);
    			add_location(h4, file$2, 22, 12, 660);
    			attr_dev(div, "class", "menu svelte-1ruhryj");
    			toggle_class(div, "selected", /*list*/ ctx[2].active === true);
    			add_location(div, file$2, 20, 8, 554);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, h4);
    			append_dev(h4, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*menus*/ 1 && t1_value !== (t1_value = /*list*/ ctx[2].menu + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*menus*/ 1 && h4_id_value !== (h4_id_value = /*list*/ ctx[2].id)) {
    				attr_dev(h4, "id", h4_id_value);
    			}

    			if (dirty & /*menus*/ 1) {
    				toggle_class(div, "selected", /*list*/ ctx[2].active === true);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(20:8) {#each menus as list, key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let nav;
    	let div;
    	let each_value = /*menus*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "menubar svelte-1ruhryj");
    			add_location(div, file$2, 18, 4, 487);
    			attr_dev(nav, "class", "container svelte-1ruhryj");
    			add_location(nav, file$2, 17, 0, 458);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*menus*/ 1) {
    				each_value = /*menus*/ ctx[0];
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);

    	let menus = [
    		{
    			menu: 'Home',
    			id: 0,
    			active: true,
    			link: "#newsmap"
    		},
    		{
    			menu: 'Search',
    			id: 1,
    			active: false,
    			link: "#search"
    		},
    		{
    			menu: 'Newsmap',
    			id: 2,
    			active: false,
    			link: "#original"
    		},
    		{
    			menu: 'Podcast',
    			id: 3,
    			active: false,
    			link: "#podcast"
    		}
    	];

    	const menuClick = id => {
    		menus.forEach(menu => {
    			menu.active = false;
    		});

    		$$invalidate(0, menus[id].active = true, menus);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ menus, menuClick });

    	$$self.$inject_state = $$props => {
    		if ('menus' in $$props) $$invalidate(0, menus = $$props.menus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [menus];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Rewara.svelte generated by Svelte v3.46.4 */

    const file$1 = "src\\Rewara.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (28:16) {:catch error}
    function create_catch_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "An error occurred!";
    			add_location(p, file$1, 28, 20, 1071);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(28:16) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (16:16) {:then data}
    function create_then_block(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let p;
    	let t1_value = /*data*/ ctx[2][0].title + "";
    	let t1;
    	let t2;
    	let ul;
    	let each_value = { length: 4 };
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(img, "class", "imgthumb svelte-1jqqvam");
    			if (!src_url_equal(img.src, img_src_value = /*data*/ ctx[2][0].url)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*data*/ ctx[2][0].title);
    			add_location(img, file$1, 17, 20, 548);
    			attr_dev(p, "class", "article-title svelte-1jqqvam");
    			add_location(p, file$1, 18, 20, 632);
    			attr_dev(div, "class", "firstnews");
    			add_location(div, file$1, 16, 16, 503);
    			attr_dev(ul, "class", "othernews svelte-1jqqvam");
    			add_location(ul, file$1, 20, 20, 722);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, p);
    			append_dev(p, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fetchImage*/ 2) {
    				each_value = { length: 4 };
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(16:16) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (22:24) {#each {length: 4} as _, i}
    function create_each_block(ctx) {
    	let li;
    	let p;
    	let t0_value = /*data*/ ctx[2][/*i*/ ctx[5]].title + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(p, "class", "article-title svelte-1jqqvam");
    			add_location(p, file$1, 23, 32, 878);
    			attr_dev(li, "class", "news svelte-1jqqvam");
    			add_location(li, file$1, 22, 28, 827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, p);
    			append_dev(p, t0);
    			append_dev(li, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(22:24) {#each {length: 4} as _, i}",
    		ctx
    	});

    	return block;
    }

    // (14:35)                   <p>...waiting</p>                  {:then data}
    function create_pending_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "...waiting";
    			add_location(p, file$1, 14, 16, 438);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(14:35)                   <p>...waiting</p>                  {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let p;
    	let t0;
    	let t1;
    	let div1;
    	let div0;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 2,
    		error: 6
    	};

    	handle_promise(/*fetchImage*/ ctx[1], info);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			p = element("p");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			info.block.c();
    			attr_dev(p, "class", "title svelte-1jqqvam");
    			add_location(p, file$1, 10, 8, 281);
    			attr_dev(div0, "class", "rewara svelte-1jqqvam");
    			add_location(div0, file$1, 12, 12, 363);
    			attr_dev(div1, "class", "rewara-container svelte-1jqqvam");
    			add_location(div1, file$1, 11, 8, 319);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$1, 9, 4, 248);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, p);
    			append_dev(p, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			info.block.m(div0, info.anchor = null);
    			info.mount = () => div0;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			info.block.d();
    			info.token = null;
    			info = null;
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
    	validate_slots('Rewara', slots, []);
    	let { title = '' } = $$props;

    	const fetchImage = (async () => {
    		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    		return await response.json();
    	})();

    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rewara> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title, fetchImage });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, fetchImage];
    }

    class Rewara extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rewara",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get title() {
    		throw new Error("<Rewara>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Rewara>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Video.svelte generated by Svelte v3.46.4 */

    function create_fragment$1(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
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

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Video', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Video> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Video extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Video",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let link;
    	let t0;
    	let main;
    	let div;
    	let header;
    	let updating_height;
    	let t1;
    	let newsmap;
    	let t2;
    	let sentiment;
    	let t3;
    	let original;
    	let t4;
    	let deduktif;
    	let t5;
    	let rewara;
    	let t6;
    	let news0;
    	let t7;
    	let news1;
    	let t8;
    	let podcast;
    	let t9;
    	let menu;
    	let current;

    	function header_height_binding(value) {
    		/*header_height_binding*/ ctx[1](value);
    	}

    	let header_props = {};

    	if (/*margin*/ ctx[0] !== void 0) {
    		header_props.height = /*margin*/ ctx[0];
    	}

    	header = new Header({ props: header_props, $$inline: true });
    	binding_callbacks.push(() => bind(header, 'height', header_height_binding));

    	newsmap = new Newsmap({
    			props: { margin: /*margin*/ ctx[0] },
    			$$inline: true
    		});

    	sentiment = new Sentiment({ $$inline: true });
    	original = new NewsmapOriginal({ $$inline: true });
    	deduktif = new Deduktif({ $$inline: true });

    	rewara = new Rewara({
    			props: { title: "REWARA" },
    			$$inline: true
    		});

    	news0 = new News({
    			props: { title: "TRENDING NOW" },
    			$$inline: true
    		});

    	news1 = new News({
    			props: { title: "PUBLIC NEWS" },
    			$$inline: true
    		});

    	podcast = new Podcast({ $$inline: true });
    	menu = new Menu({ $$inline: true });

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			main = element("main");
    			div = element("div");
    			create_component(header.$$.fragment);
    			t1 = space();
    			create_component(newsmap.$$.fragment);
    			t2 = space();
    			create_component(sentiment.$$.fragment);
    			t3 = space();
    			create_component(original.$$.fragment);
    			t4 = space();
    			create_component(deduktif.$$.fragment);
    			t5 = space();
    			create_component(rewara.$$.fragment);
    			t6 = space();
    			create_component(news0.$$.fragment);
    			t7 = space();
    			create_component(news1.$$.fragment);
    			t8 = space();
    			create_component(podcast.$$.fragment);
    			t9 = space();
    			create_component(menu.$$.fragment);
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    			add_location(link, file, 17, 1, 445);
    			attr_dev(div, "class", "container svelte-18hvwtu");
    			add_location(div, file, 21, 1, 583);
    			attr_dev(main, "class", "svelte-18hvwtu");
    			add_location(main, file, 20, 0, 575);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			mount_component(header, div, null);
    			append_dev(div, t1);
    			mount_component(newsmap, div, null);
    			append_dev(div, t2);
    			mount_component(sentiment, div, null);
    			append_dev(div, t3);
    			mount_component(original, div, null);
    			append_dev(div, t4);
    			mount_component(deduktif, div, null);
    			append_dev(div, t5);
    			mount_component(rewara, div, null);
    			append_dev(div, t6);
    			mount_component(news0, div, null);
    			append_dev(div, t7);
    			mount_component(news1, div, null);
    			append_dev(div, t8);
    			mount_component(podcast, div, null);
    			append_dev(div, t9);
    			mount_component(menu, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const header_changes = {};

    			if (!updating_height && dirty & /*margin*/ 1) {
    				updating_height = true;
    				header_changes.height = /*margin*/ ctx[0];
    				add_flush_callback(() => updating_height = false);
    			}

    			header.$set(header_changes);
    			const newsmap_changes = {};
    			if (dirty & /*margin*/ 1) newsmap_changes.margin = /*margin*/ ctx[0];
    			newsmap.$set(newsmap_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(newsmap.$$.fragment, local);
    			transition_in(sentiment.$$.fragment, local);
    			transition_in(original.$$.fragment, local);
    			transition_in(deduktif.$$.fragment, local);
    			transition_in(rewara.$$.fragment, local);
    			transition_in(news0.$$.fragment, local);
    			transition_in(news1.$$.fragment, local);
    			transition_in(podcast.$$.fragment, local);
    			transition_in(menu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(newsmap.$$.fragment, local);
    			transition_out(sentiment.$$.fragment, local);
    			transition_out(original.$$.fragment, local);
    			transition_out(deduktif.$$.fragment, local);
    			transition_out(rewara.$$.fragment, local);
    			transition_out(news0.$$.fragment, local);
    			transition_out(news1.$$.fragment, local);
    			transition_out(podcast.$$.fragment, local);
    			transition_out(menu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(newsmap);
    			destroy_component(sentiment);
    			destroy_component(original);
    			destroy_component(deduktif);
    			destroy_component(rewara);
    			destroy_component(news0);
    			destroy_component(news1);
    			destroy_component(podcast);
    			destroy_component(menu);
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
    	let margin;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function header_height_binding(value) {
    		margin = value;
    		$$invalidate(0, margin);
    	}

    	$$self.$capture_state = () => ({
    		Header,
    		Newsmap,
    		Original: NewsmapOriginal,
    		Sentiment,
    		Deduktif,
    		News,
    		Podcast,
    		Menu,
    		Rewara,
    		Video,
    		margin
    	});

    	$$self.$inject_state = $$props => {
    		if ('margin' in $$props) $$invalidate(0, margin = $$props.margin);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [margin, header_height_binding];
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
