
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
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
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
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
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
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
class HtmlTag {
    constructor() {
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
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
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
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
function tick() {
    schedule_update();
    return resolved_promise;
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

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

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
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind$1(component, name, callback) {
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
function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
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
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional$1 = config.transitional || transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional$1.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel_1('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof {"env":{"DOMAIN":"https://admin-dev.jurno.id/","URL_API":"https://api-dev.jurno.id/api/newsmap/v1/","URL_IMAGE":"https://admin-dev.newsmap.id/uploads/","URL_CUSTOM_HTML":"https://admin-dev.newsmap.id/files/","NO_IMAGE":"./image/logo-jurno-web.svg","isProd":false}} !== 'undefined' && Object.prototype.toString.call({"env":{"DOMAIN":"https://admin-dev.jurno.id/","URL_API":"https://api-dev.jurno.id/api/newsmap/v1/","URL_IMAGE":"https://admin-dev.newsmap.id/uploads/","URL_CUSTOM_HTML":"https://admin-dev.newsmap.id/files/","NO_IMAGE":"./image/logo-jurno-web.svg","isProd":false}}) === '[object {"env":{"DOMAIN":"https://admin-dev.jurno.id/","URL_API":"https://api-dev.jurno.id/api/newsmap/v1/","URL_IMAGE":"https://admin-dev.newsmap.id/uploads/","URL_CUSTOM_HTML":"https://admin-dev.newsmap.id/files/","NO_IMAGE":"./image/logo-jurno-web.svg","isProd":false}}]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults$1 = {

  transitional: transitional,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults$1.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults$1.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults$1.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults$1;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  var context = this || defaults_1;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel_1('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

var data = {
  "version": "0.26.1"
};

var VERSION = data.version;

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

var validator = {
  assertOptions: assertOptions,
  validators: validators$1
};

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios_1;

// Expose Cancel & CancelToken
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel;
axios$1.VERSION = data.version;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;

var axios_1 = axios$1;

// Allow use of default import syntax in TypeScript
var _default = axios$1;
axios_1.default = _default;

var axios = axios_1;

// spotify
const URI_SPOTIFY_LIST = 'spotify/list';

// youtube
const URI_YOUTUBE_LIST = 'youtube/list';
const URI_YOUTUBE_DETAIL = 'youtube/detail';

// jurno
const URI_ARTICLE_LIST = 'article/list';
const URI_ARTICLE_DETAIL = 'article/detail';
const URI_ARTICLE_PREV_NEXT = 'article/prev-next';

// deduktif
const URI_DEDUKTIF_LIST = 'deduktif/list';
const URI_DEDUKTIF_DETAIL = 'deduktif/detail';

//infogram
const URI_INFOGRAM_LIST = 'infogram/list';

// rewara
const URI_REWARA_LIST = 'rewara/list';
const URI_REWARA_DETAIL = 'rewara/detail';
const URI_REWARA_PREV_NEXT = 'rewara/prev-next';

// twitter
const URI_TWITTER_LIST = 'twitter/list';
const URI_TWITTER_TOP_BUZZER = 'twitter/top-buzzer';
const URI_TWITTER_VIRALITY = 'twitter/virality';

// news
const URI_NEWS_LIST = 'news/list';
const URI_NEWS_DETAIL = 'news/detail';
const URI_NEWS_ONTOLOGY = 'news/ontology';
const URI_NEWS_TOP_MEDIA = 'news/top-media';
const URI_NEWS_TOP_ENTITY = 'news/top-entity';
const URI_NEWS_LAST_TOPIC_STAT = 'news/last-topic-stat';
const URI_NEWS_STATEMENT_LIST = 'news/statement-list';

// entity
const URI_ENTITY_PROFILE = 'entity/profile';
const URI_ENTITY_VOICES = 'entity/voices';
const URI_ENTITY_RELATED_TOPICS = 'entity/related-topics';
const URI_ENTITY_RELATED_ENTITIES = 'entity/related-entities';

// location regions
const URI_LOCATION_REGION = 'location/regions';

// topic
const URI_TOPIC_DETAIL = 'topic/detail';
const URI_LAST_TOPIC = 'topic/last-topic';

//settings
const URI_SETTING = 'settings';


// token
const URI_TOKEN = 'token';

//comments
const URI_NEWS_COMMENT_TOTAL = 'news/comment-total';

// sitemap
const URI_SITEMAP = 'sitemap';

// search
const URI_SEARCH = 'search';

var ihttp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    URI_SPOTIFY_LIST: URI_SPOTIFY_LIST,
    URI_YOUTUBE_LIST: URI_YOUTUBE_LIST,
    URI_YOUTUBE_DETAIL: URI_YOUTUBE_DETAIL,
    URI_ARTICLE_LIST: URI_ARTICLE_LIST,
    URI_ARTICLE_DETAIL: URI_ARTICLE_DETAIL,
    URI_ARTICLE_PREV_NEXT: URI_ARTICLE_PREV_NEXT,
    URI_DEDUKTIF_LIST: URI_DEDUKTIF_LIST,
    URI_DEDUKTIF_DETAIL: URI_DEDUKTIF_DETAIL,
    URI_INFOGRAM_LIST: URI_INFOGRAM_LIST,
    URI_REWARA_LIST: URI_REWARA_LIST,
    URI_REWARA_DETAIL: URI_REWARA_DETAIL,
    URI_REWARA_PREV_NEXT: URI_REWARA_PREV_NEXT,
    URI_TWITTER_LIST: URI_TWITTER_LIST,
    URI_TWITTER_TOP_BUZZER: URI_TWITTER_TOP_BUZZER,
    URI_TWITTER_VIRALITY: URI_TWITTER_VIRALITY,
    URI_NEWS_LIST: URI_NEWS_LIST,
    URI_NEWS_DETAIL: URI_NEWS_DETAIL,
    URI_NEWS_ONTOLOGY: URI_NEWS_ONTOLOGY,
    URI_NEWS_TOP_MEDIA: URI_NEWS_TOP_MEDIA,
    URI_NEWS_TOP_ENTITY: URI_NEWS_TOP_ENTITY,
    URI_NEWS_LAST_TOPIC_STAT: URI_NEWS_LAST_TOPIC_STAT,
    URI_NEWS_STATEMENT_LIST: URI_NEWS_STATEMENT_LIST,
    URI_ENTITY_PROFILE: URI_ENTITY_PROFILE,
    URI_ENTITY_VOICES: URI_ENTITY_VOICES,
    URI_ENTITY_RELATED_TOPICS: URI_ENTITY_RELATED_TOPICS,
    URI_ENTITY_RELATED_ENTITIES: URI_ENTITY_RELATED_ENTITIES,
    URI_LOCATION_REGION: URI_LOCATION_REGION,
    URI_TOPIC_DETAIL: URI_TOPIC_DETAIL,
    URI_LAST_TOPIC: URI_LAST_TOPIC,
    URI_SETTING: URI_SETTING,
    URI_TOKEN: URI_TOKEN,
    URI_NEWS_COMMENT_TOTAL: URI_NEWS_COMMENT_TOTAL,
    URI_SITEMAP: URI_SITEMAP,
    URI_SEARCH: URI_SEARCH
});

function truncText(text, length = 100) {
    if (text === undefined) {
        return '';
    }

    return text !== null && text.length > length ? text.substring(0, length) + '...' : text;
}

function fixSpotifyLink(link) {
    if (link.length > 0 && !link.includes('embed-podcast')) {
        link = link.replace("spotify.com", "spotify.com/embed-podcast");
    }

    return link;
}

function stringToDom(text) {
    if (text !== null && text.length > 0) {
        text = text.replace(/\n/g, "<br />");

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        return doc.body.innerText;
    }
}

function localStore(key, data, type = 'get') {
    switch (type) {
        case 'get':
            let dt = localStorage.getItem(key);
            return dt ? dt : '';
        case 'set':
            localStorage.setItem(key, data);
            break;
        case 'remove':
            localStorage.removeItem(key);
            break;
        case 'clear':
            localStorage.clear();
            break;
    }
}

const URL_API = {"env":{"DOMAIN":"https://admin-dev.jurno.id/","URL_API":"https://api-dev.jurno.id/api/newsmap/v1/","URL_IMAGE":"https://admin-dev.newsmap.id/uploads/","URL_CUSTOM_HTML":"https://admin-dev.newsmap.id/files/","NO_IMAGE":"./image/logo-jurno-web.svg","isProd":false}}['env']['URL_API'];

const getToken = async (isServer = false) => {
    const url = `${URL_API}${URI_TOKEN}`;

    const token = await axios.get(url)
        .then(result => result.data.access_token)
        .catch(error => {
            return { error: true, message: error };
        });

    if (!isServer) {
        localStore('token', token, 'set');
    }
    return token;
};

const get = async (uri, params = {}, isServer = false) => {
    const url = `${URL_API}${uri}`;
    const tokenStr = isServer ? await getToken(true) : localStore('token');

    const result = await axios.get(url, { headers: { "Authorization": `JWT ${tokenStr}` }, params })
        .then(result => result.data)
        .catch(error => {
            return { error: true, message: error };
        });

    return result;
};

const parseNumber = parseFloat;

function joinCss(obj, separator = ';') {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}

function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = '1em';
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = '-.125em';
  const overflow = 'visible';

  if (fw) {
    textAlign = 'center';
    width = '1.25em';
  }

  if (pull) {
    float = pull;
  }

  if (size) {
    if (size == 'lg') {
      fontSize = '1.33333em';
      lineHeight = '.75em';
      verticalAlign = '-.225em';
    } else if (size == 'xs') {
      fontSize = '.75em';
    } else if (size == 'sm') {
      fontSize = '.875em';
    } else {
      fontSize = size.replace('x', 'em');
    }
  }

  return joinCss([
    joinCss({
      float,
      width,
      height,
      'line-height': lineHeight,
      'font-size': fontSize,
      'text-align': textAlign,
      'vertical-align': verticalAlign,
      'transform-origin': 'center',
      overflow,
    }),
    style,
  ]);
}

function getTransform(
  scale,
  translateX,
  translateY,
  rotate,
  flip,
  translateTimes = 1,
  translateUnit = '',
  rotateUnit = '',
) {
  let flipX = 1;
  let flipY = 1;

  if (flip) {
    if (flip == 'horizontal') {
      flipX = -1;
    } else if (flip == 'vertical') {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }

  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`,
    ],
    ' ',
  );
}

/* node_modules\svelte-fa\src\fa.svelte generated by Svelte v3.46.4 */
const file$3 = "node_modules\\svelte-fa\\src\\fa.svelte";

// (78:0) {#if i[4]}
function create_if_block$2(ctx) {
	let svg;
	let g1;
	let g0;
	let g1_transform_value;
	let g1_transform_origin_value;
	let svg_class_value;
	let svg_viewBox_value;

	function select_block_type(ctx, dirty) {
		if (typeof /*i*/ ctx[7][4] == 'string') return create_if_block_1$1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			g1 = svg_element("g");
			g0 = svg_element("g");
			if_block.c();
			attr_dev(g0, "transform", /*transform*/ ctx[10]);
			add_location(g0, file$3, 91, 6, 1469);
			attr_dev(g1, "transform", g1_transform_value = `translate(${/*i*/ ctx[7][0] / 2} ${/*i*/ ctx[7][1] / 2})`);
			attr_dev(g1, "transform-origin", g1_transform_origin_value = `${/*i*/ ctx[7][0] / 4} 0`);
			add_location(g1, file$3, 87, 4, 1358);
			attr_dev(svg, "id", /*id*/ ctx[0]);
			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*c*/ ctx[8]) + " svelte-1cj2gr0"));
			attr_dev(svg, "style", /*s*/ ctx[9]);
			attr_dev(svg, "viewBox", svg_viewBox_value = `0 0 ${/*i*/ ctx[7][0]} ${/*i*/ ctx[7][1]}`);
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "role", "img");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			add_location(svg, file$3, 78, 2, 1195);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, g1);
			append_dev(g1, g0);
			if_block.m(g0, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(g0, null);
				}
			}

			if (dirty & /*transform*/ 1024) {
				attr_dev(g0, "transform", /*transform*/ ctx[10]);
			}

			if (dirty & /*i*/ 128 && g1_transform_value !== (g1_transform_value = `translate(${/*i*/ ctx[7][0] / 2} ${/*i*/ ctx[7][1] / 2})`)) {
				attr_dev(g1, "transform", g1_transform_value);
			}

			if (dirty & /*i*/ 128 && g1_transform_origin_value !== (g1_transform_origin_value = `${/*i*/ ctx[7][0] / 4} 0`)) {
				attr_dev(g1, "transform-origin", g1_transform_origin_value);
			}

			if (dirty & /*id*/ 1) {
				attr_dev(svg, "id", /*id*/ ctx[0]);
			}

			if (dirty & /*c*/ 256 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*c*/ ctx[8]) + " svelte-1cj2gr0"))) {
				attr_dev(svg, "class", svg_class_value);
			}

			if (dirty & /*s*/ 512) {
				attr_dev(svg, "style", /*s*/ ctx[9]);
			}

			if (dirty & /*i*/ 128 && svg_viewBox_value !== (svg_viewBox_value = `0 0 ${/*i*/ ctx[7][0]} ${/*i*/ ctx[7][1]}`)) {
				attr_dev(svg, "viewBox", svg_viewBox_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(78:0) {#if i[4]}",
		ctx
	});

	return block;
}

// (99:8) {:else}
function create_else_block(ctx) {
	let path0;
	let path0_d_value;
	let path0_fill_value;
	let path0_fill_opacity_value;
	let path0_transform_value;
	let path1;
	let path1_d_value;
	let path1_fill_value;
	let path1_fill_opacity_value;
	let path1_transform_value;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr_dev(path0, "d", path0_d_value = /*i*/ ctx[7][4][0]);
			attr_dev(path0, "fill", path0_fill_value = /*secondaryColor*/ ctx[3] || /*color*/ ctx[1] || 'currentColor');

			attr_dev(path0, "fill-opacity", path0_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
			? /*primaryOpacity*/ ctx[4]
			: /*secondaryOpacity*/ ctx[5]);

			attr_dev(path0, "transform", path0_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
			add_location(path0, file$3, 99, 10, 1721);
			attr_dev(path1, "d", path1_d_value = /*i*/ ctx[7][4][1]);
			attr_dev(path1, "fill", path1_fill_value = /*primaryColor*/ ctx[2] || /*color*/ ctx[1] || 'currentColor');

			attr_dev(path1, "fill-opacity", path1_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
			? /*secondaryOpacity*/ ctx[5]
			: /*primaryOpacity*/ ctx[4]);

			attr_dev(path1, "transform", path1_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
			add_location(path1, file$3, 105, 10, 1982);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path0, anchor);
			insert_dev(target, path1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*i*/ 128 && path0_d_value !== (path0_d_value = /*i*/ ctx[7][4][0])) {
				attr_dev(path0, "d", path0_d_value);
			}

			if (dirty & /*secondaryColor, color*/ 10 && path0_fill_value !== (path0_fill_value = /*secondaryColor*/ ctx[3] || /*color*/ ctx[1] || 'currentColor')) {
				attr_dev(path0, "fill", path0_fill_value);
			}

			if (dirty & /*swapOpacity, primaryOpacity, secondaryOpacity*/ 112 && path0_fill_opacity_value !== (path0_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
			? /*primaryOpacity*/ ctx[4]
			: /*secondaryOpacity*/ ctx[5])) {
				attr_dev(path0, "fill-opacity", path0_fill_opacity_value);
			}

			if (dirty & /*i*/ 128 && path0_transform_value !== (path0_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
				attr_dev(path0, "transform", path0_transform_value);
			}

			if (dirty & /*i*/ 128 && path1_d_value !== (path1_d_value = /*i*/ ctx[7][4][1])) {
				attr_dev(path1, "d", path1_d_value);
			}

			if (dirty & /*primaryColor, color*/ 6 && path1_fill_value !== (path1_fill_value = /*primaryColor*/ ctx[2] || /*color*/ ctx[1] || 'currentColor')) {
				attr_dev(path1, "fill", path1_fill_value);
			}

			if (dirty & /*swapOpacity, secondaryOpacity, primaryOpacity*/ 112 && path1_fill_opacity_value !== (path1_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
			? /*secondaryOpacity*/ ctx[5]
			: /*primaryOpacity*/ ctx[4])) {
				attr_dev(path1, "fill-opacity", path1_fill_opacity_value);
			}

			if (dirty & /*i*/ 128 && path1_transform_value !== (path1_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
				attr_dev(path1, "transform", path1_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(99:8) {:else}",
		ctx
	});

	return block;
}

// (93:8) {#if typeof i[4] == 'string'}
function create_if_block_1$1(ctx) {
	let path;
	let path_d_value;
	let path_fill_value;
	let path_transform_value;

	const block = {
		c: function create() {
			path = svg_element("path");
			attr_dev(path, "d", path_d_value = /*i*/ ctx[7][4]);
			attr_dev(path, "fill", path_fill_value = /*color*/ ctx[1] || /*primaryColor*/ ctx[2] || 'currentColor');
			attr_dev(path, "transform", path_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
			add_location(path, file$3, 93, 10, 1533);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*i*/ 128 && path_d_value !== (path_d_value = /*i*/ ctx[7][4])) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty & /*color, primaryColor*/ 6 && path_fill_value !== (path_fill_value = /*color*/ ctx[1] || /*primaryColor*/ ctx[2] || 'currentColor')) {
				attr_dev(path, "fill", path_fill_value);
			}

			if (dirty & /*i*/ 128 && path_transform_value !== (path_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
				attr_dev(path, "transform", path_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(93:8) {#if typeof i[4] == 'string'}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let if_block_anchor;
	let if_block = /*i*/ ctx[7][4] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*i*/ ctx[7][4]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	validate_slots('Fa', slots, []);
	let { class: clazz = '' } = $$props;
	let { id = '' } = $$props;
	let { style = '' } = $$props;
	let { icon } = $$props;
	let { size = '' } = $$props;
	let { color = '' } = $$props;
	let { fw = false } = $$props;
	let { pull = '' } = $$props;
	let { scale = 1 } = $$props;
	let { translateX = 0 } = $$props;
	let { translateY = 0 } = $$props;
	let { rotate = '' } = $$props;
	let { flip = false } = $$props;
	let { spin = false } = $$props;
	let { pulse = false } = $$props;
	let { primaryColor = '' } = $$props;
	let { secondaryColor = '' } = $$props;
	let { primaryOpacity = 1 } = $$props;
	let { secondaryOpacity = 0.4 } = $$props;
	let { swapOpacity = false } = $$props;
	let i;
	let c;
	let s;
	let transform;

	const writable_props = [
		'class',
		'id',
		'style',
		'icon',
		'size',
		'color',
		'fw',
		'pull',
		'scale',
		'translateX',
		'translateY',
		'rotate',
		'flip',
		'spin',
		'pulse',
		'primaryColor',
		'secondaryColor',
		'primaryOpacity',
		'secondaryOpacity',
		'swapOpacity'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fa> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(11, clazz = $$props.class);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('style' in $$props) $$invalidate(12, style = $$props.style);
		if ('icon' in $$props) $$invalidate(13, icon = $$props.icon);
		if ('size' in $$props) $$invalidate(14, size = $$props.size);
		if ('color' in $$props) $$invalidate(1, color = $$props.color);
		if ('fw' in $$props) $$invalidate(15, fw = $$props.fw);
		if ('pull' in $$props) $$invalidate(16, pull = $$props.pull);
		if ('scale' in $$props) $$invalidate(17, scale = $$props.scale);
		if ('translateX' in $$props) $$invalidate(18, translateX = $$props.translateX);
		if ('translateY' in $$props) $$invalidate(19, translateY = $$props.translateY);
		if ('rotate' in $$props) $$invalidate(20, rotate = $$props.rotate);
		if ('flip' in $$props) $$invalidate(21, flip = $$props.flip);
		if ('spin' in $$props) $$invalidate(22, spin = $$props.spin);
		if ('pulse' in $$props) $$invalidate(23, pulse = $$props.pulse);
		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
		if ('secondaryColor' in $$props) $$invalidate(3, secondaryColor = $$props.secondaryColor);
		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
		if ('secondaryOpacity' in $$props) $$invalidate(5, secondaryOpacity = $$props.secondaryOpacity);
		if ('swapOpacity' in $$props) $$invalidate(6, swapOpacity = $$props.swapOpacity);
	};

	$$self.$capture_state = () => ({
		joinCss,
		getStyles,
		getTransform,
		clazz,
		id,
		style,
		icon,
		size,
		color,
		fw,
		pull,
		scale,
		translateX,
		translateY,
		rotate,
		flip,
		spin,
		pulse,
		primaryColor,
		secondaryColor,
		primaryOpacity,
		secondaryOpacity,
		swapOpacity,
		i,
		c,
		s,
		transform
	});

	$$self.$inject_state = $$props => {
		if ('clazz' in $$props) $$invalidate(11, clazz = $$props.clazz);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('style' in $$props) $$invalidate(12, style = $$props.style);
		if ('icon' in $$props) $$invalidate(13, icon = $$props.icon);
		if ('size' in $$props) $$invalidate(14, size = $$props.size);
		if ('color' in $$props) $$invalidate(1, color = $$props.color);
		if ('fw' in $$props) $$invalidate(15, fw = $$props.fw);
		if ('pull' in $$props) $$invalidate(16, pull = $$props.pull);
		if ('scale' in $$props) $$invalidate(17, scale = $$props.scale);
		if ('translateX' in $$props) $$invalidate(18, translateX = $$props.translateX);
		if ('translateY' in $$props) $$invalidate(19, translateY = $$props.translateY);
		if ('rotate' in $$props) $$invalidate(20, rotate = $$props.rotate);
		if ('flip' in $$props) $$invalidate(21, flip = $$props.flip);
		if ('spin' in $$props) $$invalidate(22, spin = $$props.spin);
		if ('pulse' in $$props) $$invalidate(23, pulse = $$props.pulse);
		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
		if ('secondaryColor' in $$props) $$invalidate(3, secondaryColor = $$props.secondaryColor);
		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
		if ('secondaryOpacity' in $$props) $$invalidate(5, secondaryOpacity = $$props.secondaryOpacity);
		if ('swapOpacity' in $$props) $$invalidate(6, swapOpacity = $$props.swapOpacity);
		if ('i' in $$props) $$invalidate(7, i = $$props.i);
		if ('c' in $$props) $$invalidate(8, c = $$props.c);
		if ('s' in $$props) $$invalidate(9, s = $$props.s);
		if ('transform' in $$props) $$invalidate(10, transform = $$props.transform);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*icon*/ 8192) {
			$$invalidate(7, i = icon && icon.icon || [0, 0, '', [], '']);
		}

		if ($$self.$$.dirty & /*clazz, spin, pulse*/ 12584960) {
			$$invalidate(8, c = joinCss([clazz, 'svelte-fa', spin && 'spin', pulse && 'pulse'], ' '));
		}

		if ($$self.$$.dirty & /*style, size, pull, fw*/ 118784) {
			$$invalidate(9, s = getStyles(style, size, pull, fw));
		}

		if ($$self.$$.dirty & /*scale, translateX, translateY, rotate, flip*/ 4063232) {
			$$invalidate(10, transform = getTransform(scale, translateX, translateY, rotate, flip, 512));
		}
	};

	return [
		id,
		color,
		primaryColor,
		secondaryColor,
		primaryOpacity,
		secondaryOpacity,
		swapOpacity,
		i,
		c,
		s,
		transform,
		clazz,
		style,
		icon,
		size,
		fw,
		pull,
		scale,
		translateX,
		translateY,
		rotate,
		flip,
		spin,
		pulse
	];
}

class Fa extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {
			class: 11,
			id: 0,
			style: 12,
			icon: 13,
			size: 14,
			color: 1,
			fw: 15,
			pull: 16,
			scale: 17,
			translateX: 18,
			translateY: 19,
			rotate: 20,
			flip: 21,
			spin: 22,
			pulse: 23,
			primaryColor: 2,
			secondaryColor: 3,
			primaryOpacity: 4,
			secondaryOpacity: 5,
			swapOpacity: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Fa",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*icon*/ ctx[13] === undefined && !('icon' in props)) {
			console.warn("<Fa> was created without expected prop 'icon'");
		}
	}

	get class() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get icon() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set icon(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fw() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fw(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pull() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pull(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scale() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scale(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get translateX() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set translateX(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get translateY() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set translateY(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rotate() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rotate(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flip() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flip(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get spin() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set spin(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pulse() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pulse(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get primaryColor() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set primaryColor(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get secondaryColor() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set secondaryColor(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get primaryOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set primaryOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get secondaryOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set secondaryOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get swapOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set swapOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
var faAngleLeft = {
  prefix: 'fas',
  iconName: 'angle-left',
  icon: [256, 512, [8249], "f104", "M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"]
};
var faAngleRight = {
  prefix: 'fas',
  iconName: 'angle-right',
  icon: [256, 512, [8250], "f105", "M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"]
};
var faCamera = {
  prefix: 'fas',
  iconName: 'camera',
  icon: [512, 512, [62258, "camera-alt"], "f030", "M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"]
};
var faCameraAlt = faCamera;
var faCopyright = {
  prefix: 'fas',
  iconName: 'copyright',
  icon: [512, 512, [169], "f1f9", "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM199.2 312.6c14.94 15.06 34.8 23.38 55.89 23.38c.0313 0 0 0 0 0c21.06 0 40.92-8.312 55.83-23.38c9.375-9.375 24.53-9.469 33.97-.1562c9.406 9.344 9.469 24.53 .1562 33.97c-24 24.22-55.95 37.56-89.95 37.56c0 0 .0313 0 0 0c-33.97 0-65.95-13.34-89.95-37.56c-49.44-49.88-49.44-131 0-180.9c24-24.22 55.98-37.56 89.95-37.56c.0313 0 0 0 0 0c34 0 65.95 13.34 89.95 37.56c9.312 9.438 9.25 24.62-.1562 33.97c-9.438 9.344-24.59 9.188-33.97-.1562c-14.91-15.06-34.77-23.38-55.83-23.38c0 0 .0313 0 0 0c-21.09 0-40.95 8.312-55.89 23.38C168.3 230.6 168.3 281.4 199.2 312.6z"]
};
var faShare = {
  prefix: 'fas',
  iconName: 'share',
  icon: [512, 512, ["arrow-turn-right", "mail-forward"], "f064", "M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z"]
};
var faSpinner = {
  prefix: 'fas',
  iconName: 'spinner',
  icon: [512, 512, [], "f110", "M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"]
};

var defaultConfig = {
    queryHandler: {
        parse: search => fromEntries(new URLSearchParams(search)),
        stringify: params => '?' + (new URLSearchParams(params)).toString()
    },
    urlTransform: {
        apply: x => x,
        remove: x => x
    },
    useHash: false
};


function fromEntries(iterable) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj
    }, {})
}

const MATCH_PARAM = RegExp(/\:([^/()]+)/g);

function handleScroll(element, scrollToTop) {
  if (navigator.userAgent.includes('jsdom')) return false
  if (scrollToTop) scrollAncestorsToTop(element);
  handleHash();
}

function handleHash() {
  if (navigator.userAgent.includes('jsdom')) return false
  const { hash } = window.location;
  if (hash) {
    const validElementIdRegex = /^[A-Za-z]+[\w\-\:\.]*$/;
    if (validElementIdRegex.test(hash.substring(1))) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView();
    }
  }
}

function scrollAncestorsToTop(element) {
  if (
    element &&
    element.scrollTo &&
    element.dataset.routify !== 'scroll-lock' &&
    element.dataset['routify-scroll'] !== 'lock'
  ) {
    element.style['scroll-behavior'] = 'auto';
    element.scrollTo({ top: 0, behavior: 'auto' });
    element.style['scroll-behavior'] = '';
    scrollAncestorsToTop(element.parentElement);
  }
}

const pathToRegex = (str, recursive) => {
  const suffix = recursive ? '' : '/?$'; //fallbacks should match recursively
  str = str.replace(/\/_fallback?$/, '(/|$)');
  str = str.replace(/\/index$/, '(/index)?'); //index files should be matched even if not present in url
  str = str.replace(MATCH_PARAM, '([^/]+)') + suffix;
  str = `^${str}`;
  return str
};

const pathToParamKeys = string => {
  const paramsKeys = [];
  let matches;
  while ((matches = MATCH_PARAM.exec(string))) paramsKeys.push(matches[1]);
  return paramsKeys
};

const pathToRank = ({ path }) => {
  return path
    .split('/')
    .filter(Boolean)
    .map(str => (str === '_fallback' ? 'A' : str.startsWith(':') ? 'B' : 'C'))
    .join('')
};

/** Supresses Routify caused logs and warnings for one tick */
function suppressComponentWarnings(ctx, tick) {
  suppressComponentWarnings._console = suppressComponentWarnings._console || { log: console.log, warn: console.warn };
  const { _console } = suppressComponentWarnings;

  const name = ctx.componentFile.name
    .replace(/Proxy<_?(.+)>/, '$1') //nollup wraps names in Proxy<...>
    .replace(/^Index$/, ctx.component.shortPath.split('/').pop()) //nollup names Index.svelte index. We want a real name
    .replace(/^./, s => s.toUpperCase()) //capitalize first letter
    .replace(/\:(.+)/, 'U5B$1u5D'); // :id => U5Bidu5D

  const ignores = [
    `<${name}> received an unexpected slot "default".`,
    `<${name}> was created with unknown prop 'scoped'`,
    `<${name}> was created with unknown prop 'scopedSync'`,
  ];
  for (const log of ['log', 'warn']) {
    console[log] = (...args) => {
      if (!ignores.includes(args[0]))
        _console[log](...args);
    };
    tick().then(() => {
      //after component has been created, we want to restore the console method (log or warn)
      console[log] = _console[log];
    });
  }
}

function currentLocation() {
  let dirtyFullpath = window.location.pathname + window.location.search + window.location.hash;
  const { url, options } = resolvePrefetch(dirtyFullpath);
  const parsedUrl = parseUrl(url);

  return { ...parsedUrl, options }
}

/**
 * converts /path/to__routify_url_options__1234abcde to
 * {options, url: '/path/to'}
 * @param {string} dirtyFullpath 
 */
function resolvePrefetch(dirtyFullpath) {
  const [url, _options] = dirtyFullpath.split('__[[routify_url_options]]__');

  const options = JSON.parse(decodeURIComponent(_options || '') || '{}');

  window.routify = window.routify || {};
  window.routify.prefetched = options.prefetch;

  return { url, options }
}

/**
 * 
 * @param {string} url 
 */
function parseUrl(url) {
  if (defaultConfig.useHash)
    url = url.replace(/.*#(.+)/, '$1');
  const origin = url.startsWith('/') ? window.location.origin : undefined;
  const _url = new URL(url, origin);
  const fullpath = _url.pathname + _url.search + _url.hash;
  return { url: _url, fullpath }
}


/**
 * populates parameters, applies urlTransform, prefixes hash
 * eg. /foo/:bar to /foo/something or #/foo/something
 * and applies config.urlTransform
 * @param {*} path 
 * @param {*} params 
 */
function resolveUrl(path, params, inheritedParams) {
  const hash = defaultConfig.useHash ? '#' : '';
  let url;
  url = populateUrl(path, params, inheritedParams);
  url = defaultConfig.urlTransform.apply(url);
  url = hash + url;
  return url
}


/**
 * populates an url path with parameters
 * populateUrl('/home/:foo', {foo: 'something', bar:'baz'})  to /foo/something?bar=baz
 * @param {*} path 
 * @param {*} params 
 */
function populateUrl(path, params, inheritedParams) {
  const allParams = Object.assign({}, inheritedParams, params);
  const queryString = getQueryString(path, params);

  for (const [key, value] of Object.entries(allParams))
    path = path.replace(`:${key}`, value);

  return `${path}${queryString}`
}


/**
 * 
 * @param {string} path 
 * @param {object} params 
 */
function getQueryString(path, params) {
  if (!defaultConfig.queryHandler) return ""
  const ignoredKeys = pathToParamKeys(path);
  const queryParams = {};
  if (params) Object.entries(params).forEach(([key, value]) => {
    if (!ignoredKeys.includes(key))
      queryParams[key] = value;
  });
  return defaultConfig.queryHandler.stringify(queryParams).replace(/\?$/, '')
}

/* node_modules\@roxi\routify\runtime\decorators\Noop.svelte generated by Svelte v3.46.4 */

function create_fragment$4(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}
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
			if (default_slot) default_slot.d(detaching);
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
	validate_slots('Noop', slots, ['default']);
	let { scoped = {} } = $$props;
	const writable_props = ['scoped'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Noop> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ scoped });

	$$self.$inject_state = $$props => {
		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [scoped, $$scope, slots];
}

class Noop extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { scoped: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Noop",
			options,
			id: create_fragment$4.name
		});
	}

	get scoped() {
		throw new Error("<Noop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scoped(value) {
		throw new Error("<Noop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

window.routify = window.routify || {};

/** @type {import('svelte/store').Writable<RouteNode>} */
const route = writable(null); // the actual route being rendered

/** @type {import('svelte/store').Writable<RouteNode[]>} */
const routes$1 = writable([]); // all routes
routes$1.subscribe(routes => (window.routify.routes = routes));

let rootContext = writable({ component: { params: {} } });

/** @type {import('svelte/store').Writable<RouteNode>} */
const urlRoute = writable(null);  // the route matching the url

const isChangingPage = writable(true);

async function onPageLoaded({ page, metatags, afterPageLoad, parentNode }) {
    //scroll needs to run after page load
    const scrollToTop = page.last !== page;
    setTimeout(() => handleScroll(parentNode, scrollToTop));

    const { path } = page;
    const { options } = currentLocation();
    const prefetchId = options.prefetch;

    for (const hook of afterPageLoad._hooks) {
        // deleted/invalidated hooks are left as undefined
        if (hook) await hook(page.api);
    }

    metatags.update();

    dispatchEvent(new CustomEvent('app-loaded'));
    parent.postMessage({
        msg: 'app-loaded',
        prefetched: window.routify.prefetched,
        path,
        prefetchId
    }, "*");
    window['routify'].appLoaded = true;
    window['routify'].stopAutoReady = false;
}

/**
 * @param {string} url 
 * @return {ClientNode}
 */
function urlToRoute(url, clone = false) {
    url = defaultConfig.urlTransform.remove(url);
    let { pathname, search } = parseUrl(url).url;

    /** @type {RouteNode[]} */
    const routes = get_store_value(routes$1);
    const matchingRoute =
        // find a route with a matching name
        routes.find(route => pathname === route.meta.name) ||
        // or a matching path
        routes.find(route => pathname.match(route.regex));

    if (!matchingRoute)
        throw new Error(`Route could not be found for "${pathname}".`)

    // we want to clone if we're only previewing an URL
    const _matchingRoute = clone ? Object.create(matchingRoute) : matchingRoute;

    const { route, redirectPath, rewritePath } = resolveRedirects(_matchingRoute, routes);

    if (rewritePath) {
        ({ pathname, search } = parseUrl(resolveUrl(rewritePath, route.params)).url);
        if (redirectPath)
            route.redirectTo = resolveUrl(redirectPath, route.params || {});
    }

    if (defaultConfig.queryHandler)
        route.params = Object.assign({}, defaultConfig.queryHandler.parse(search));

    assignParamsToRouteAndLayouts(route, pathname);

    route.leftover = url.replace(new RegExp(route.regex), '');
    return route
}

function assignParamsToRouteAndLayouts(route, pathname) {
    if (route.paramKeys) {
        const layouts = layoutByPos(route.layouts);
        const fragments = pathname.split('/').filter(Boolean);
        const routeProps = getRouteProps(route.path);

        routeProps.forEach((prop, i) => {
            if (prop) {
                route.params[prop] = fragments[i];
                if (layouts[i]) layouts[i].param = { [prop]: fragments[i] };
                else route.param = { [prop]: fragments[i] };
            }
        });
    }
}

/**
 * 
 * @param {RouteNode} route 
 * @param {RouteNode[]} routes 
 * @param {*} params 
 */
function resolveRedirects(route, routes, redirectPath, rewritePath) {
    const { redirect, rewrite } = route.meta;

    if (redirect || rewrite) {
        redirectPath = redirect ? redirect.path || redirect : redirectPath;
        rewritePath = rewrite ? rewrite.path || rewrite : redirectPath;
        const redirectParams = redirect && redirect.params;
        const rewriteParams = rewrite && rewrite.params;

        const newRoute = routes.find(r => r.path.replace(/\/index$/,'') === rewritePath);

        if (newRoute === route) console.error(`${rewritePath} is redirecting to itself`);
        if (!newRoute) console.error(`${route.path} is redirecting to non-existent path: ${rewritePath}`);
        if (redirectParams || rewriteParams)
            newRoute.params = Object.assign({}, newRoute.params, redirectParams, rewriteParams);

        return resolveRedirects(newRoute, routes, redirectPath, rewritePath)
    }
    return { route, redirectPath, rewritePath }
}


/**
 * @param {array} layouts
 */
function layoutByPos(layouts) {
    const arr = [];
    layouts.forEach(layout => {
        arr[layout.path.split('/').filter(Boolean).length - 1] = layout;
    });
    return arr
}


/**
 * @param {string} url
 */
function getRouteProps(url) {
    return url
        .split('/')
        .filter(Boolean)
        .map(f => f.match(/\:(.+)/))
        .map(f => f && f[1])
}

/* node_modules\@roxi\routify\runtime\Prefetcher.svelte generated by Svelte v3.46.4 */
const file$2 = "node_modules\\@roxi\\routify\\runtime\\Prefetcher.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (80:2) {#each $actives as prefetch (prefetch.options.prefetch)}
function create_each_block$1(key_1, ctx) {
	let iframe;
	let iframe_src_value;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			iframe = element("iframe");
			if (!src_url_equal(iframe.src, iframe_src_value = /*prefetch*/ ctx[1].url)) attr_dev(iframe, "src", iframe_src_value);
			attr_dev(iframe, "frameborder", "0");
			attr_dev(iframe, "title", "routify prefetcher");
			add_location(iframe, file$2, 80, 4, 2274);
			this.first = iframe;
		},
		m: function mount(target, anchor) {
			insert_dev(target, iframe, anchor);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$actives*/ 1 && !src_url_equal(iframe.src, iframe_src_value = /*prefetch*/ ctx[1].url)) {
				attr_dev(iframe, "src", iframe_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(iframe);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(80:2) {#each $actives as prefetch (prefetch.options.prefetch)}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*$actives*/ ctx[0];
	validate_each_argument(each_value);
	const get_key = ctx => /*prefetch*/ ctx[1].options.prefetch;
	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "id", "__routify_iframes");
			set_style(div, "display", "none");
			add_location(div, file$2, 78, 0, 2160);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$actives*/ 1) {
				each_value = /*$actives*/ ctx[0];
				validate_each_argument(each_value);
				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$1, null, get_each_context$1);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
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

const iframeNum = 2;

const defaults = {
	validFor: 60,
	timeout: 5000,
	gracePeriod: 1000
};

/** stores and subscriptions */
const queue = writable([]);

const actives = derived(queue, q => q.slice(0, iframeNum));

actives.subscribe(actives => actives.forEach(({ options }) => {
	setTimeout(() => removeFromQueue(options.prefetch), options.timeout);
}));

function prefetch(path, options = {}) {
	prefetch.id = prefetch.id || 1;
	path = path.href || path;
	options = { ...defaults, ...options };
	options.prefetch = prefetch.id++;

	//don't prefetch within prefetch or SSR
	if (window.routify.prefetched || navigator.userAgent.match('jsdom')) return false;

	// add to queue
	queue.update(q => {
		if (!q.some(e => e.options.path === path)) q.push({
			url: `${path}__[[routify_url_options]]__${encodeURIComponent(JSON.stringify(options))}`,
			options
		});

		return q;
	});
}

/**
 * @param {number|MessageEvent} idOrEvent
 */
function removeFromQueue(idOrEvent) {
	const id = idOrEvent.data ? idOrEvent.data.prefetchId : idOrEvent;
	if (!id) return null;
	const entry = get_store_value(queue).find(entry => entry && entry.options.prefetch == id);

	// removeFromQueue is called by both eventListener and timeout,
	// but we can only remove the item once
	if (entry) {
		const { gracePeriod } = entry.options;
		const gracePromise = new Promise(resolve => setTimeout(resolve, gracePeriod));

		const idlePromise = new Promise(resolve => {
				window.requestIdleCallback
				? window.requestIdleCallback(resolve)
				: setTimeout(resolve, gracePeriod + 1000);
			});

		Promise.all([gracePromise, idlePromise]).then(() => {
			queue.update(q => q.filter(q => q.options.prefetch != id));
		});
	}
}

// Listen to message from child window
addEventListener('message', removeFromQueue, false);

function instance$3($$self, $$props, $$invalidate) {
	let $actives;
	validate_store(actives, 'actives');
	component_subscribe($$self, actives, $$value => $$invalidate(0, $actives = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Prefetcher', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Prefetcher> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		writable,
		derived,
		get: get_store_value,
		iframeNum,
		defaults,
		queue,
		actives,
		prefetch,
		removeFromQueue,
		$actives
	});

	return [$actives];
}

class Prefetcher extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Prefetcher",
			options,
			id: create_fragment$3.name
		});
	}
}

/// <reference path="../typedef.js" />

/** @ts-check */
/**
 * @typedef {Object} RoutifyContext
 * @prop {ClientNode} component
 * @prop {ClientNode} layout
 * @prop {any} componentFile 
 * 
 *  @returns {import('svelte/store').Readable<RoutifyContext>} */
function getRoutifyContext() {
  return getContext('routify') || rootContext
}

/**
 * @callback AfterPageLoadHelper
 * @param {function} callback
 * 
 * @typedef {import('svelte/store').Readable<AfterPageLoadHelper> & {_hooks:Array<function>}} AfterPageLoadHelperStore
 * @type {AfterPageLoadHelperStore}
 */
const afterPageLoad = {
  _hooks: [
    event => isChangingPage.set(false)
  ],
  subscribe: hookHandler
};

/** 
 * @callback BeforeUrlChangeHelper
 * @param {function} callback
 *
 * @typedef {import('svelte/store').Readable<BeforeUrlChangeHelper> & {_hooks:Array<function>}} BeforeUrlChangeHelperStore
 * @type {BeforeUrlChangeHelperStore}
 **/
const beforeUrlChange = {
  _hooks: [],
  subscribe: hookHandler
};

function hookHandler(listener) {
  const hooks = this._hooks;
  const index = hooks.length;
  listener(callback => {hooks[index] = callback;});
  return (...params) => {
    delete hooks[index];
    listener(...params);
  }
}

/**
 * We have to grab params and leftover from the context and not directly from the store.
 * Otherwise the context is updated before the component is destroyed. * 
 * @typedef {Object.<string, *>} ParamsHelper
 * @typedef {import('svelte/store').Readable<ParamsHelper>} ParamsHelperStore
 * @type {ParamsHelperStore}
 **/
const params = {
  subscribe(run) {
    const ctx = getRoutifyContext();
    return derived(ctx, ctx => ctx.route.params).subscribe(run)
  }
};



const _metatags = {
  subscribe(listener) {
    this._origin = this.getOrigin();
    return listener(metatags)
  },
  props: {},
  templates: {},
  services: {
    plain: {propField: 'name', valueField: 'content'},
    twitter: {propField: 'name', valueField: 'content'},
    og: {propField: 'property', valueField: 'content'},
  },
  plugins: [
    {
      name: 'applyTemplate',
      condition: () => true,
      action: (prop, value) => {
        const template = _metatags.getLongest(_metatags.templates, prop) || (x => x);
        return [prop, template(value)]
      }
    },
    {
      name: 'createMeta',
      condition: () => true,
      action(prop, value) {
        _metatags.writeMeta(prop, value);
      }
    },
    {
      name: 'createOG',
      condition: prop => !prop.match(':'),
      action(prop, value) {
        _metatags.writeMeta(`og:${prop}`, value);
      }
    },
    {
      name: 'createTitle',
      condition: prop => prop === 'title',
      action(prop, value) {
        document.title = value;
      }
    }
  ],
  getLongest(repo, name) {
    const providers = repo[name];
    if (providers) {
      const currentPath = get_store_value(route).path;
      const allPaths = Object.keys(repo[name]);
      const matchingPaths = allPaths.filter(path => currentPath.includes(path));

      const longestKey = matchingPaths.sort((a, b) => b.length - a.length)[0];

      return providers[longestKey]
    }
  },
  writeMeta(prop, value) {
    const head = document.getElementsByTagName('head')[0];
    const match = prop.match(/(.+)\:/);
    const serviceName = match && match[1] || 'plain';
    const {propField, valueField} = metatags.services[serviceName] || metatags.services.plain;
    const oldElement = document.querySelector(`meta[${propField}='${prop}']`);
    if (oldElement) oldElement.remove();

    const newElement = document.createElement('meta');
    newElement.setAttribute(propField, prop);
    newElement.setAttribute(valueField, value);
    newElement.setAttribute('data-origin', 'routify');
    head.appendChild(newElement);
  },
  set(prop, value) {
    // we only want strings. If metatags is used as a store, svelte will try to assign an object to prop
    if (typeof prop === 'string') {
      _metatags.plugins.forEach(plugin => {
        if (plugin.condition(prop, value))
          [prop, value] = plugin.action(prop, value) || [prop, value];
      });
    }
  },
  clear() {
    const oldElement = document.querySelector(`meta`);
    if (oldElement) oldElement.remove();
  },
  template(name, fn) {
    const origin = _metatags.getOrigin;
    _metatags.templates[name] = _metatags.templates[name] || {};
    _metatags.templates[name][origin] = fn;
  },
  update() {
    Object.keys(_metatags.props).forEach((prop) => {
      let value = (_metatags.getLongest(_metatags.props, prop));
      _metatags.plugins.forEach(plugin => {
        if (plugin.condition(prop, value)) {
          [prop, value] = plugin.action(prop, value) || [prop, value];

        }
      });
    });
  },
  batchedUpdate() {
    if (!_metatags._pendingUpdate) {
      _metatags._pendingUpdate = true;
      setTimeout(() => {
        _metatags._pendingUpdate = false;
        this.update();
      });
    }
  },
  _updateQueued: false,
  _origin: false,
  getOrigin() {
    if (this._origin) return this._origin
    const routifyCtx = getRoutifyContext();
    return routifyCtx && get_store_value(routifyCtx).path || '/'
  },
  _pendingUpdate: false
};


/**
 * metatags
 * @prop {Object.<string, string>}
 */
const metatags = new Proxy(_metatags, {
  set(target, name, value, receiver) {
    const {props} = target;

    if (Reflect.has(target, name))
      Reflect.set(target, name, value, receiver);
    else {
      props[name] = props[name] || {};
      props[name][target.getOrigin()] = value;
    }

    if (window['routify'].appLoaded)
      target.batchedUpdate();
    return true
  }
});

/* node_modules\@roxi\routify\runtime\Route.svelte generated by Svelte v3.46.4 */
const file$1 = "node_modules\\@roxi\\routify\\runtime\\Route.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[21] = list[i].component;
	child_ctx[22] = list[i].componentFile;
	child_ctx[2] = list[i].decorator;
	child_ctx[1] = list[i].nodes;
	return child_ctx;
}

// (109:0) {#if $context}
function create_if_block_1(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = [/*$context*/ ctx[4]];
	validate_each_argument(each_value);
	const get_key = ctx => /*id*/ ctx[7];
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < 1; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$context, scoped, scopedSync, node, decorator, scopeToChild, id*/ 33554621) {
				each_value = [/*$context*/ ctx[4]];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < 1; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 1; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(109:0) {#if $context}",
		ctx
	});

	return block;
}

// (120:8) {#if component && nodes.length}
function create_if_block_2(ctx) {
	let route_1;
	let current;

	route_1 = new Route({
			props: {
				decorator: /*decorator*/ ctx[2],
				nodes: /*nodes*/ ctx[1],
				scoped: {
					.../*scoped*/ ctx[0],
					.../*scopeToChild*/ ctx[25]
				}
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(route_1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(route_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const route_1_changes = {};
			if (dirty & /*decorator*/ 4) route_1_changes.decorator = /*decorator*/ ctx[2];
			if (dirty & /*$context*/ 16) route_1_changes.nodes = /*nodes*/ ctx[1];

			if (dirty & /*scoped, scopeToChild*/ 33554433) route_1_changes.scoped = {
				.../*scoped*/ ctx[0],
				.../*scopeToChild*/ ctx[25]
			};

			route_1.$set(route_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(route_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(route_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(route_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(120:8) {#if component && nodes.length}",
		ctx
	});

	return block;
}

// (112:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...node.param || {}}       >
function create_default_slot_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*component*/ ctx[21] && /*nodes*/ ctx[1].length && create_if_block_2(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*component*/ ctx[21] && /*nodes*/ ctx[1].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$context*/ 16) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(112:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...node.param || {}}       >",
		ctx
	});

	return block;
}

// (111:4) <svelte:component this={decorator} {scoped}>
function create_default_slot(ctx) {
	let switch_instance;
	let t;
	let current;

	const switch_instance_spread_levels = [
		{ scoped: /*scoped*/ ctx[0] },
		{ scopedSync: /*scopedSync*/ ctx[5] },
		/*node*/ ctx[3].param || {}
	];

	var switch_value = /*componentFile*/ ctx[22];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: {
				default: [
					create_default_slot_1,
					({ scoped: scopeToChild, decorator }) => ({ 25: scopeToChild, 2: decorator }),
					({ scoped: scopeToChild, decorator }) => (scopeToChild ? 33554432 : 0) | (decorator ? 4 : 0)
				]
			},
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*scoped, scopedSync, node*/ 41)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*scoped*/ 1 && { scoped: /*scoped*/ ctx[0] },
					dirty & /*scopedSync*/ 32 && { scopedSync: /*scopedSync*/ ctx[5] },
					dirty & /*node*/ 8 && get_spread_object(/*node*/ ctx[3].param || {})
				])
			: {};

			if (dirty & /*$$scope, decorator, $context, scoped, scopeToChild*/ 100663317) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*componentFile*/ ctx[22])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, t.parentNode, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (switch_instance) destroy_component(switch_instance, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(111:4) <svelte:component this={decorator} {scoped}>",
		ctx
	});

	return block;
}

// (110:2) {#each [$context] as { component, componentFile, decorator, nodes }
function create_each_block(key_1, ctx) {
	let first;
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*decorator*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: {
				scoped: /*scoped*/ ctx[0],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);

			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty & /*scoped*/ 1) switch_instance_changes.scoped = /*scoped*/ ctx[0];

			if (dirty & /*$$scope, $context, scoped, scopedSync, node, decorator*/ 67108925) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*decorator*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(first);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(110:2) {#each [$context] as { component, componentFile, decorator, nodes }",
		ctx
	});

	return block;
}

// (133:0) {#if !parentNode}
function create_if_block$1(ctx) {
	let div;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			set_style(div, "display", "contents");
			add_location(div, file$1, 133, 2, 4156);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (!mounted) {
				dispose = action_destroyer(/*setParentNode*/ ctx[10].call(null, div));
				mounted = true;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(133:0) {#if !parentNode}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*$context*/ ctx[4] && create_if_block_1(ctx);
	let if_block1 = !/*parentNode*/ ctx[6] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*$context*/ ctx[4]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$context*/ 16) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*parentNode*/ ctx[6]) {
				if (if_block1) ; else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
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
	let id;
	let $context;
	let $route;
	let $parentContext;
	let $routes;
	validate_store(route, 'route');
	component_subscribe($$self, route, $$value => $$invalidate(14, $route = $$value));
	validate_store(routes$1, 'routes');
	component_subscribe($$self, routes$1, $$value => $$invalidate(16, $routes = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Route', slots, []);
	let { nodes = [] } = $$props;
	let { scoped = {} } = $$props;
	let { decorator = undefined } = $$props;

	/** @type {LayoutOrDecorator} */
	let node = null;

	let remainingNodes = null;
	let scopedSync = {};
	let parentNode;
	let invalidate = 1;
	const context = writable(null);
	validate_store(context, 'context');
	component_subscribe($$self, context, value => $$invalidate(4, $context = value));

	/** @type {import("svelte/store").Writable<Context>} */
	const parentContext = getContext('routify') || rootContext;

	validate_store(parentContext, 'parentContext');
	component_subscribe($$self, parentContext, value => $$invalidate(15, $parentContext = value));
	const setParentNode = el => $$invalidate(6, parentNode = el.parentNode);
	setContext('routify', context);
	let lastNodes = [];

	/**  @param {LayoutOrDecorator} node */
	function setComponent(node) {
		let PendingComponent = node.component();
		if (PendingComponent instanceof Promise) PendingComponent.then(onComponentLoaded); else onComponentLoaded(PendingComponent);
	}

	/** @param {SvelteComponent} componentFile */
	function onComponentLoaded(componentFile) {
		$$invalidate(5, scopedSync = { ...scoped });

		// we have to proxy remaining nodes through ctx (instead of props) or route changes get propagated
		// to leaf layouts of to-be-destroyed-layouts
		const ctx = {
			//we need to keep any possible context.child or the layout will be childless until the new child has been rendered
			...$context,
			nodes: remainingNodes,
			decorator: decorator || Noop,
			layout: node.isLayout ? node : $parentContext.layout,
			component: node,
			route: $route,
			routes: $routes,
			componentFile,
			parentNode: parentNode || $parentContext.parentNode
		};

		context.set(ctx);
		set_store_value(parentContext, $parentContext.child = node, $parentContext);
		if (remainingNodes.length === 0) onLastComponentLoaded();
	}

	async function onLastComponentLoaded() {
		await new Promise(resolve => setTimeout(resolve));
		const isOnCurrentRoute = $context.component.path === $route.path; //maybe we're getting redirected

		// Let everyone know the last child has rendered
		if (!window['routify'].stopAutoReady && isOnCurrentRoute) onPageLoaded({
			page: $context.component,
			metatags,
			afterPageLoad,
			parentNode
		});
	}

	/**  @param {ClientNode} layout */
	function getID({ meta, path, param, params }) {
		return JSON.stringify({
			path,
			invalidate,
			param: (meta['param-is-page'] || meta['slug-is-page']) && param,
			queryParams: meta['query-params-is-page'] && params
		});
	}

	const writable_props = ['nodes', 'scoped', 'decorator'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Route> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('nodes' in $$props) $$invalidate(1, nodes = $$props.nodes);
		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
		if ('decorator' in $$props) $$invalidate(2, decorator = $$props.decorator);
	};

	$$self.$capture_state = () => ({
		suppressComponentWarnings,
		Noop,
		getContext,
		setContext,
		tick,
		writable,
		metatags,
		afterPageLoad,
		route,
		routes: routes$1,
		rootContext,
		handleScroll,
		onPageLoaded,
		nodes,
		scoped,
		decorator,
		node,
		remainingNodes,
		scopedSync,
		parentNode,
		invalidate,
		context,
		parentContext,
		setParentNode,
		lastNodes,
		setComponent,
		onComponentLoaded,
		onLastComponentLoaded,
		getID,
		id,
		$context,
		$route,
		$parentContext,
		$routes
	});

	$$self.$inject_state = $$props => {
		if ('nodes' in $$props) $$invalidate(1, nodes = $$props.nodes);
		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
		if ('decorator' in $$props) $$invalidate(2, decorator = $$props.decorator);
		if ('node' in $$props) $$invalidate(3, node = $$props.node);
		if ('remainingNodes' in $$props) remainingNodes = $$props.remainingNodes;
		if ('scopedSync' in $$props) $$invalidate(5, scopedSync = $$props.scopedSync);
		if ('parentNode' in $$props) $$invalidate(6, parentNode = $$props.parentNode);
		if ('invalidate' in $$props) $$invalidate(11, invalidate = $$props.invalidate);
		if ('lastNodes' in $$props) $$invalidate(12, lastNodes = $$props.lastNodes);
		if ('id' in $$props) $$invalidate(7, id = $$props.id);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lastNodes, nodes, invalidate*/ 6146) {
			if (lastNodes !== nodes) {
				$$invalidate(12, lastNodes = nodes);
				$$invalidate(3, [node, ...remainingNodes] = [...nodes], node);
				$$invalidate(3, node['api'].reset = () => $$invalidate(11, invalidate++, invalidate), node);
			}
		}

		if ($$self.$$.dirty & /*node*/ 8) {
			setComponent(node);
		}

		if ($$self.$$.dirty & /*$context, invalidate*/ 2064) {
			$$invalidate(7, id = $context && invalidate && getID($context.component));
		}

		if ($$self.$$.dirty & /*$context*/ 16) {
			$context && suppressComponentWarnings($context, tick);
		}
	};

	return [
		scoped,
		nodes,
		decorator,
		node,
		$context,
		scopedSync,
		parentNode,
		id,
		context,
		parentContext,
		setParentNode,
		invalidate,
		lastNodes
	];
}

class Route extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, { nodes: 1, scoped: 0, decorator: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Route",
			options,
			id: create_fragment$2.name
		});
	}

	get nodes() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodes(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scoped() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scoped(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get decorator() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set decorator(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function init(routes, callback) {
  /** @type { ClientNode | false } */
  let lastRoute = false;

  function updatePage(proxyToUrl, shallow) {
    const url = proxyToUrl || currentLocation().fullpath;
    const route$1 = urlToRoute(url);
    if (route$1.redirectTo) {
      history.replaceStateNative({}, null, route$1.redirectTo);
      delete route$1.redirectTo;
    }

    const currentRoute = shallow && urlToRoute(currentLocation().fullpath, routes);
    const contextRoute = currentRoute || route$1;
    const nodes = [...contextRoute.layouts, route$1];
    if (lastRoute) delete lastRoute.last; //todo is a page component the right place for the previous route?
    route$1.last = lastRoute;
    lastRoute = route$1;

    //set the route in the store
    if (!proxyToUrl)
      urlRoute.set(route$1);
    route.set(route$1);

    //preload components in parallel
    route$1.api.preload().then(() => {
      //run callback in Router.svelte    
      isChangingPage.set(true);
      callback(nodes);
    });
  }

  const destroy = createEventListeners(updatePage);

  return { updatePage, destroy }
}

/**
 * svelte:window events doesn't work on refresh
 * @param {Function} updatePage
 */
function createEventListeners(updatePage) {
['pushState', 'replaceState'].forEach(eventName => {
    if (!history[eventName + 'Native'])
      history[eventName + 'Native'] = history[eventName];
    history[eventName] = async function (state = {}, title, url) {
      // do nothing if we're navigating to the current page
      const currentUrl = location.pathname + location.search + location.hash;
      if (url === currentUrl) return false

      const { id, path, params } = get_store_value(route);
      state = { id, path, params, ...state };
      const event = new Event(eventName.toLowerCase());
      Object.assign(event, { state, title, url });

      const route$1 = await runHooksBeforeUrlChange(event, url);
      if (route$1) {
        history[eventName + 'Native'].apply(this, [state, title, url]);
        return dispatchEvent(event)
      }
    };
  });

  let _ignoreNextPop = false;

  const listeners = {
    click: handleClick,
    pushstate: () => updatePage(),
    replacestate: () => updatePage(),
    popstate: async event => {
      if (_ignoreNextPop)
        _ignoreNextPop = false;
      else {
        if (await runHooksBeforeUrlChange(event, currentLocation().fullpath)) {
          updatePage();
        } else {
          _ignoreNextPop = true;
          event.preventDefault();
          history.go(1);
        }
      }
    },
  };

  Object.entries(listeners).forEach(args => addEventListener(...args));

  const unregister = () => {
    Object.entries(listeners).forEach(args => removeEventListener(...args));
  };

  return unregister
}

function handleClick(event) {
  const el = event.target.closest('a') || event.composedPath().find(el => el.tagName === 'A');
  const href = el && el.href;
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey ||
    event.button ||
    event.defaultPrevented
  )
    return
  if (!href || el.target || el.host !== location.host) return

  const url = new URL(href);
  const relativeUrl = url.pathname + url.search + url.hash;

  event.preventDefault();
  history.pushState({}, '', relativeUrl);
}

async function runHooksBeforeUrlChange(event, url) {
  const route = urlToRoute(url).api;
  for (const hook of beforeUrlChange._hooks.filter(Boolean)) {
    // return false if the hook returns false
    const result = await hook(event, route, { url });
    if (!result) return false
  }
  return true
}

/* node_modules\@roxi\routify\runtime\Router.svelte generated by Svelte v3.46.4 */

const { Object: Object_1 } = globals;

// (58:0) {#if nodes && $route !== null}
function create_if_block(ctx) {
	let route_1;
	let current;

	route_1 = new Route({
			props: { nodes: /*nodes*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(route_1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(route_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const route_1_changes = {};
			if (dirty & /*nodes*/ 1) route_1_changes.nodes = /*nodes*/ ctx[0];
			route_1.$set(route_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(route_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(route_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(route_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(58:0) {#if nodes && $route !== null}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let t;
	let prefetcher;
	let current;
	let if_block = /*nodes*/ ctx[0] && /*$route*/ ctx[1] !== null && create_if_block(ctx);
	prefetcher = new Prefetcher({ $$inline: true });

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			t = space();
			create_component(prefetcher.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, t, anchor);
			mount_component(prefetcher, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*nodes*/ ctx[0] && /*$route*/ ctx[1] !== null) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*nodes, $route*/ 3) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(prefetcher.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(prefetcher.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(t);
			destroy_component(prefetcher, detaching);
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

function instance$1($$self, $$props, $$invalidate) {
	let $route;
	validate_store(route, 'route');
	component_subscribe($$self, route, $$value => $$invalidate(1, $route = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Router', slots, []);
	let { routes } = $$props;
	let { config = {} } = $$props;
	let nodes;
	let navigator;
	window.routify = window.routify || {};
	window.routify.inBrowser = !window.navigator.userAgent.match('jsdom');
	Object.assign(defaultConfig, config);
	const updatePage = (...args) => navigator && navigator.updatePage(...args);
	setContext('routifyupdatepage', updatePage);
	const callback = res => $$invalidate(0, nodes = res);

	const cleanup = () => {
		if (!navigator) return;
		navigator.destroy();
		navigator = null;
	};

	let initTimeout = null;

	// init is async to prevent a horrible bug that completely disable reactivity
	// in the host component -- something like the component's update function is
	// called before its fragment is created, and since the component is then seen
	// as already dirty, it is never scheduled for update again, and remains dirty
	// forever... I failed to isolate the precise conditions for the bug, but the
	// faulty update is triggered by a change in the route store, and so offseting
	// store initialization by one tick gives the host component some time to
	// create its fragment. The root cause it probably a bug in Svelte with deeply
	// intertwinned store and reactivity.
	const doInit = () => {
		clearTimeout(initTimeout);

		initTimeout = setTimeout(() => {
			cleanup();
			navigator = init(routes, callback);
			routes$1.set(routes);
			navigator.updatePage();
		});
	};

	onDestroy(cleanup);
	const writable_props = ['routes', 'config'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
		if ('config' in $$props) $$invalidate(3, config = $$props.config);
	};

	$$self.$capture_state = () => ({
		setContext,
		onDestroy,
		Route,
		Prefetcher,
		init,
		route,
		routesStore: routes$1,
		defaultConfig,
		routes,
		config,
		nodes,
		navigator,
		updatePage,
		callback,
		cleanup,
		initTimeout,
		doInit,
		$route
	});

	$$self.$inject_state = $$props => {
		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
		if ('config' in $$props) $$invalidate(3, config = $$props.config);
		if ('nodes' in $$props) $$invalidate(0, nodes = $$props.nodes);
		if ('navigator' in $$props) navigator = $$props.navigator;
		if ('initTimeout' in $$props) initTimeout = $$props.initTimeout;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*routes*/ 4) {
			if (routes) doInit();
		}
	};

	return [nodes, $route, routes, config];
}

class Router extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { routes: 2, config: 3 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Router",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*routes*/ ctx[2] === undefined && !('routes' in props)) {
			console.warn("<Router> was created without expected prop 'routes'");
		}
	}

	get routes() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set routes(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get config() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set config(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/** 
 * Node payload
 * @typedef {Object} NodePayload
 * @property {RouteNode=} file current node
 * @property {RouteNode=} parent parent of the current node
 * @property {StateObject=} state state shared by every node in the walker
 * @property {Object=} scope scope inherited by descendants in the scope
 *
 * State Object
 * @typedef {Object} StateObject
 * @prop {TreePayload=} treePayload payload from the tree
 * 
 * Node walker proxy
 * @callback NodeWalkerProxy
 * @param {NodePayload} NodePayload
 */


/**
 * Node middleware
 * @description Walks through the nodes of a tree
 * @example middleware = createNodeMiddleware(payload => {payload.file.name = 'hello'})(treePayload))
 * @param {NodeWalkerProxy} fn 
 */
function createNodeMiddleware(fn) {

    /**    
     * NodeMiddleware payload receiver
     * @param {TreePayload} payload
     */
    const inner = async function execute(payload) {
        return await nodeMiddleware(fn, {
            file: payload.tree,
            state: { treePayload: payload },
            scope: {}
        })
    };

    /**    
     * NodeMiddleware sync payload receiver
     * @param {TreePayload} payload
     */
    inner.sync = function executeSync(payload) {
        return nodeMiddlewareSync(fn, {
            file: payload.tree,
            state: { treePayload: payload },
            scope: {}
        })
    };

    return inner
}

/**
 * Node walker
 * @param {NodeWalkerProxy} fn function to be called for each file
 * @param {NodePayload=} payload 
 */
async function nodeMiddleware(fn, payload) {
    const _file = await fn(payload);
    if (_file === false) return false
    const file = _file || payload.file;

    if (file.children) {
        const children = await Promise.all(file.children.map(async _file => nodeMiddleware(fn, {
            state: payload.state,
            scope: clone(payload.scope || {}),
            parent: payload.file,
            file: await _file
        })));
        file.children = children.filter(Boolean);
    }

    return file
}

/**
 * Node walker (sync version)
 * @param {NodeWalkerProxy} fn function to be called for each file
 * @param {NodePayload=} payload 
 */
function nodeMiddlewareSync(fn, payload) {
    const _file = fn(payload);
    if (_file === false) return false

    const file = _file || payload.file;

    if (file.children) {
        const children = file.children.map(_file => nodeMiddlewareSync(fn, {
            state: payload.state,
            scope: clone(payload.scope || {}),
            parent: payload.file,
            file: _file
        }));
        file.children = children.filter(Boolean);
    }

    return file
}


/**
 * Clone with JSON
 * @param {T} obj 
 * @returns {T} JSON cloned object
 * @template T
 */
function clone(obj) { return JSON.parse(JSON.stringify(obj)) }

const setRegex = createNodeMiddleware(({ file }) => {
    if (file.isPage || file.isFallback)
        file.regex = pathToRegex(file.path, file.isFallback);
});
const setParamKeys = createNodeMiddleware(({ file }) => {
    file.paramKeys = pathToParamKeys(file.path);
});

const setShortPath = createNodeMiddleware(({ file }) => {
    if (file.isFallback || file.isIndex)
        file.shortPath = file.path.replace(/\/[^/]+$/, '');
    else file.shortPath = file.path;
});
const setRank = createNodeMiddleware(({ file }) => {
    file.ranking = pathToRank(file);
});


// todo delete?
const addMetaChildren = createNodeMiddleware(({ file }) => {
    const node = file;
    const metaChildren = file.meta && file.meta.children || [];
    if (metaChildren.length) {
        node.children = node.children || [];
        node.children.push(...metaChildren.map(meta => ({ isMeta: true, ...meta, meta })));
    }
});

const setIsIndexable = createNodeMiddleware(payload => {
    const { file } = payload;
    const { isFallback, meta } = file;
    const isDynamic = file.path.split('/').pop().startsWith(':');
    const isIndex = file.path.endsWith('/index');
    const isIndexed = meta.index || meta.index === 0;
    const isHidden = meta.index === false;

    file.isIndexable = isIndexed || (!isFallback && !isDynamic && !isIndex && !isHidden);
    file.isNonIndexable = !file.isIndexable;
});

const assignRelations = createNodeMiddleware(({ file, parent }) => {
    Object.defineProperty(file, 'parent', { get: () => parent });
    Object.defineProperty(file, 'nextSibling', { get: () => _getSibling(file, 1) });
    Object.defineProperty(file, 'prevSibling', { get: () => _getSibling(file, -1) });
    Object.defineProperty(file, 'lineage', { get: () => _getLineage(parent) });
});

function _getLineage(node, lineage = []) {
    if (node) {
        lineage.unshift(node);
        _getLineage(node.parent, lineage);
    }
    return lineage
}

/**
 * 
 * @param {RouteNode} file 
 * @param {Number} direction 
 */
function _getSibling(file, direction) {
    if (!file.root) {
        const siblings = file.parent.children.filter(c => c.isIndexable);
        const index = siblings.indexOf(file);
        return siblings[index + direction]
    }
}

const assignIndex = createNodeMiddleware(({ file, parent }) => {
    if (file.isIndex) Object.defineProperty(parent, 'index', { get: () => file });
});

const assignLayout = createNodeMiddleware(({ file, scope }) => {
    // create a layouts getter
    Object.defineProperty(file, 'layouts', { get: () => getLayouts(file) });

    /**
     * returns a list of layouts by recursively traversing the AST ancestry
     * @param {RouteNode} file 
     * @returns {RouteNode[]}
     */
    function getLayouts(file) {
        // if this isn't a layout and it's reset, return an empty array
        if (!file.isLayout && file.meta.reset) return []

        const { parent } = file;
        const layout = parent && parent.component && parent;
        const isReset = layout && (layout.isReset || layout.meta.reset);
        const layouts = (parent && !isReset && getLayouts(parent)) || [];
        if (layout) layouts.push(layout);
        return layouts
    }
});


const createFlatList = treePayload => {
    createNodeMiddleware(payload => {
        if (payload.file.isPage || payload.file.isFallback)
            payload.state.treePayload.routes.push(payload.file);
    }).sync(treePayload);
    treePayload.routes.sort((c, p) => (c.ranking >= p.ranking ? -1 : 1));
};

const setPrototype = createNodeMiddleware(({ file }) => {
    const Prototype = file.root
        ? Root
        : file.children
            ? file.isPage ? PageDir : Dir
            : file.isReset
                ? Reset
                : file.isLayout
                    ? Layout
                    : file.isFallback
                        ? Fallback
                        : Page;
    Object.setPrototypeOf(file, Prototype.prototype);

    function Layout() { }
    function Dir() { }
    function Fallback() { }
    function Page() { }
    function PageDir() { }
    function Reset() { }
    function Root() { }
});

var miscPlugins = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setRegex: setRegex,
    setParamKeys: setParamKeys,
    setShortPath: setShortPath,
    setRank: setRank,
    addMetaChildren: addMetaChildren,
    setIsIndexable: setIsIndexable,
    assignRelations: assignRelations,
    assignIndex: assignIndex,
    assignLayout: assignLayout,
    createFlatList: createFlatList,
    setPrototype: setPrototype
});

const defaultNode = {
    "isDir": false,
    "ext": "svelte",
    "isLayout": false,
    "isReset": false,
    "isIndex": false,
    "isFallback": false,
    "isPage": false,
    "ownMeta": {},
    "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
    },
    "id": "__fallback",
};

function restoreDefaults(node) {
    Object.entries(defaultNode).forEach(([key, value]) => {
        if (typeof node[key] === 'undefined')
            node[key] = value;
    });
    
    if(node.children)
        node.children = node.children.map(restoreDefaults);

    return node
}

const assignAPI = createNodeMiddleware(({ file }) => {
    file.api = new ClientApi(file);
});

class ClientApi {
    constructor(file) {
        this.__file = file;
        Object.defineProperty(this, '__file', { enumerable: false });
        this.isMeta = !!file.isMeta;
        this.path = file.path;
        this.title = _prettyName(file);
        this.meta = file.meta;
    }

    get parent() { return !this.__file.root && this.__file.parent.api }
    get children() {
        return (this.__file.children || this.__file.isLayout && this.__file.parent.children || [])
            .filter(c => !c.isNonIndexable)
            .sort((a, b) => {
                if (a.isMeta && b.isMeta) return 0
                a = (a.meta.index || a.meta.title || a.path).toString();
                b = (b.meta.index || b.meta.title || b.path).toString();
                return a.localeCompare((b), undefined, { numeric: true, sensitivity: 'base' })
            })
            .map(({ api }) => api)
    }
    get next() { return _navigate(this, +1) }
    get prev() { return _navigate(this, -1) }
    async preload() {
        const filePromises = [
            ...this.__file.layouts,
            this.__file,
            this.index && this.index.__file //if this is a layout, we want to include its index
        ]
            .filter(Boolean)
            .map(file => file.component());
        await Promise.all(filePromises);
    }
    get component() {
        return this.__file.component ? //is file?
            this.__file.component()
            : this.__file.index ? //is dir with index?
                this.__file.index.component()
                : false
    }
    get componentWithIndex() {
        return new Promise(resolve =>
            Promise.all([
                this.component,
                this.index && this.index.component
            ])
                .then(res => resolve(res))
        )
    }
    get index() {
        const child = this.__file.children &&
            this.__file.children.find(child => child.isIndex);
        return child && child.api
    }
}

function _navigate(node, direction) {
    if (!node.__file.root) {
        const siblings = node.parent.children;
        const index = siblings.indexOf(node);
        return node.parent.children[index + direction]
    }
}


function _prettyName(file) {
    if (typeof file.meta.title !== 'undefined') return file.meta.title
    else return (file.shortPath || file.path)
        .split('/')
        .pop()
        .replace(/-/g, ' ')
}

const plugins = {
  ...miscPlugins,
  restoreDefaults: ({ tree }) => restoreDefaults(tree),
  assignAPI
};

function buildClientTree(tree) {
  const order = [
    // all
    "restoreDefaults",
    // pages
    "setParamKeys", //pages only
    "setRegex", //pages only
    "setShortPath", //pages only
    "setRank", //pages only
    "assignLayout", //pages only,
    // all
    "setPrototype",
    "addMetaChildren",
    "assignRelations", //all (except meta components?)
    "setIsIndexable", //all
    "assignIndex", //all
    "assignAPI", //all
    // routes
    "createFlatList"
  ];

  const payload = { tree, routes: [] };
  for (let name of order) {
    // if plugin is a createNodeMiddleware, use the sync function
    const fn = plugins[name].sync || plugins[name];
    fn(payload);
  }
  return payload
}

//tree
const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "_fallback.svelte",
      "filepath": "/_fallback.svelte",
      "name": "_fallback",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/_fallback.svelte",
      "importPath": "../src/pages/_fallback.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": true,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/_fallback",
      "id": "__fallback",
      "component": () => import('./_fallback-225fa503.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "about.svelte",
      "filepath": "/about.svelte",
      "name": "about",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/about.svelte",
      "importPath": "../src/pages/about.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/about",
      "id": "_about",
      "component": () => import('./about-23adcd81.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "AboutDeduktif.svelte",
      "filepath": "/AboutDeduktif.svelte",
      "name": "AboutDeduktif",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/AboutDeduktif.svelte",
      "importPath": "../src/pages/AboutDeduktif.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/AboutDeduktif",
      "id": "_AboutDeduktif",
      "component": () => import('./AboutDeduktif-13e71c98.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "AboutUs.svelte",
      "filepath": "/AboutUs.svelte",
      "name": "AboutUs",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/AboutUs.svelte",
      "importPath": "../src/pages/AboutUs.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/AboutUs",
      "id": "_AboutUs",
      "component": () => import('./AboutUs-cbf734cc.js').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "article",
      "filepath": "/article",
      "name": "article",
      "ext": "",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/article",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[slug].svelte",
          "filepath": "/article/[slug].svelte",
          "name": "[slug]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/article/[slug].svelte",
          "importPath": "../src/pages/article/[slug].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/article/:slug",
          "id": "_article__slug",
          "component": () => import('./_slug_-587a09bc.js').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/article/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/article/index.svelte",
          "importPath": "../src/pages/article/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/article/index",
          "id": "_article_index",
          "component": () => import('./index-c9830f4a.js').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/article"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "ArticleDetail.svelte",
      "filepath": "/ArticleDetail.svelte",
      "name": "ArticleDetail",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/ArticleDetail.svelte",
      "importPath": "../src/pages/ArticleDetail.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/ArticleDetail",
      "id": "_ArticleDetail",
      "component": () => import('./ArticleDetail-18037715.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "contact.svelte",
      "filepath": "/contact.svelte",
      "name": "contact",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/contact.svelte",
      "importPath": "../src/pages/contact.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/contact",
      "id": "_contact",
      "component": () => import('./contact-27d959b3.js').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "deduktif",
      "filepath": "/deduktif",
      "name": "deduktif",
      "ext": "",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/deduktif",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[slug].svelte",
          "filepath": "/deduktif/[slug].svelte",
          "name": "[slug]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/deduktif/[slug].svelte",
          "importPath": "../src/pages/deduktif/[slug].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/deduktif/:slug",
          "id": "_deduktif__slug",
          "component": () => import('./_slug_-333ade83.js').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "about.svelte",
          "filepath": "/deduktif/about.svelte",
          "name": "about",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/deduktif/about.svelte",
          "importPath": "../src/pages/deduktif/about.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/deduktif/about",
          "id": "_deduktif_about",
          "component": () => import('./about-1b87fd08.js').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/deduktif/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/deduktif/index.svelte",
          "importPath": "../src/pages/deduktif/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/deduktif/index",
          "id": "_deduktif_index",
          "component": () => import('./index-d701ac4d.js').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "redaksi.svelte",
          "filepath": "/deduktif/redaksi.svelte",
          "name": "redaksi",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/deduktif/redaksi.svelte",
          "importPath": "../src/pages/deduktif/redaksi.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/deduktif/redaksi",
          "id": "_deduktif_redaksi",
          "component": () => import('./redaksi-b1547591.js').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/deduktif"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "DeduktifDetail.svelte",
      "filepath": "/DeduktifDetail.svelte",
      "name": "DeduktifDetail",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/DeduktifDetail.svelte",
      "importPath": "../src/pages/DeduktifDetail.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/DeduktifDetail",
      "id": "_DeduktifDetail",
      "component": () => import('./DeduktifDetail-5d2fa0e0.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "IndeksCari.svelte",
      "filepath": "/IndeksCari.svelte",
      "name": "IndeksCari",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/IndeksCari.svelte",
      "importPath": "../src/pages/IndeksCari.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/IndeksCari",
      "id": "_IndeksCari",
      "component": () => import('./IndeksCari-d8383758.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "IndeksDeduktif.svelte",
      "filepath": "/IndeksDeduktif.svelte",
      "name": "IndeksDeduktif",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/IndeksDeduktif.svelte",
      "importPath": "../src/pages/IndeksDeduktif.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/IndeksDeduktif",
      "id": "_IndeksDeduktif",
      "component": () => import('./IndeksDeduktif-8e09f103.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "IndeksInfogram.svelte",
      "filepath": "/IndeksInfogram.svelte",
      "name": "IndeksInfogram",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/IndeksInfogram.svelte",
      "importPath": "../src/pages/IndeksInfogram.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/IndeksInfogram",
      "id": "_IndeksInfogram",
      "component": () => import('./IndeksInfogram-e9171cea.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "IndeksJurno.svelte",
      "filepath": "/IndeksJurno.svelte",
      "name": "IndeksJurno",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/IndeksJurno.svelte",
      "importPath": "../src/pages/IndeksJurno.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/IndeksJurno",
      "id": "_IndeksJurno",
      "component": () => import('./IndeksJurno-d09f725b.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "IndeksRewara.svelte",
      "filepath": "/IndeksRewara.svelte",
      "name": "IndeksRewara",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/IndeksRewara.svelte",
      "importPath": "../src/pages/IndeksRewara.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/IndeksRewara",
      "id": "_IndeksRewara",
      "component": () => import('./IndeksRewara-06e2d8a9.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('./index-79e74146.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "JurnoDetail.svelte",
      "filepath": "/JurnoDetail.svelte",
      "name": "JurnoDetail",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/JurnoDetail.svelte",
      "importPath": "../src/pages/JurnoDetail.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/JurnoDetail",
      "id": "_JurnoDetail",
      "component": () => import('./JurnoDetail-760f7475.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "NotFound.svelte",
      "filepath": "/NotFound.svelte",
      "name": "NotFound",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/NotFound.svelte",
      "importPath": "../src/pages/NotFound.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/NotFound",
      "id": "_NotFound",
      "component": () => import('./NotFound-76dd6447.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "paralaks.svelte",
      "filepath": "/paralaks.svelte",
      "name": "paralaks",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/paralaks.svelte",
      "importPath": "../src/pages/paralaks.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/paralaks",
      "id": "_paralaks",
      "component": () => import('./paralaks-6bc32713.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "redaksi.svelte",
      "filepath": "/redaksi.svelte",
      "name": "redaksi",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/redaksi.svelte",
      "importPath": "../src/pages/redaksi.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/redaksi",
      "id": "_redaksi",
      "component": () => import('./redaksi-24e82e7d.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "RedaksiDeduktif.svelte",
      "filepath": "/RedaksiDeduktif.svelte",
      "name": "RedaksiDeduktif",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/RedaksiDeduktif.svelte",
      "importPath": "../src/pages/RedaksiDeduktif.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/RedaksiDeduktif",
      "id": "_RedaksiDeduktif",
      "component": () => import('./RedaksiDeduktif-14e6f64c.js').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "rewara",
      "filepath": "/rewara",
      "name": "rewara",
      "ext": "",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/rewara",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[slug].svelte",
          "filepath": "/rewara/[slug].svelte",
          "name": "[slug]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/rewara/[slug].svelte",
          "importPath": "../src/pages/rewara/[slug].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/rewara/:slug",
          "id": "_rewara__slug",
          "component": () => import('./_slug_-4920b2b8.js').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/rewara/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/rewara/index.svelte",
          "importPath": "../src/pages/rewara/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/rewara/index",
          "id": "_rewara_index",
          "component": () => import('./index-4f05bf7d.js').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/rewara"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "RewaraDetail.svelte",
      "filepath": "/RewaraDetail.svelte",
      "name": "RewaraDetail",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/RewaraDetail.svelte",
      "importPath": "../src/pages/RewaraDetail.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/RewaraDetail",
      "id": "_RewaraDetail",
      "component": () => import('./RewaraDetail-2659eabc.js').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "search.svelte",
      "filepath": "/search.svelte",
      "name": "search",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "A:/Work/NEWSMAP/newsmap.github.io/newsmap-mobile-app/src/pages/search.svelte",
      "importPath": "../src/pages/search.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/search",
      "id": "_search",
      "component": () => import('./search-2ac167b2.js').then(m => m.default)
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
};


const {tree, routes} = buildClientTree(_tree);

/* src\InitApp.svelte generated by Svelte v3.46.4 */
const file = "src\\InitApp.svelte";

// (50:0) {:catch error}
function create_catch_block(ctx) {
	let div;
	let p;

	const block = {
		c: function create() {
			div = element("div");
			p = element("p");
			p.textContent = "An error occured";
			attr_dev(p, "class", "error svelte-p5gmgs");
			add_location(p, file, 51, 8, 2015);
			attr_dev(div, "class", "loading svelte-p5gmgs");
			add_location(div, file, 50, 4, 1985);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, p);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(50:0) {:catch error}",
		ctx
	});

	return block;
}

// (48:0) {:then data}
function create_then_block(ctx) {
	let router;
	let current;
	router = new Router({ props: { routes }, $$inline: true });

	const block = {
		c: function create() {
			create_component(router.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(router, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(router.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(router.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(router, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(48:0) {:then data}",
		ctx
	});

	return block;
}

// (43:19)      <!-- Put Loading Animation Here-->     <div class="loading">         <Fa icon={faSpinner}
function create_pending_block(ctx) {
	let div;
	let fa;
	let current;

	fa = new Fa({
			props: { icon: faSpinner, size: "3x", pulse: true },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(fa.$$.fragment);
			attr_dev(div, "class", "loading svelte-p5gmgs");
			add_location(div, file, 44, 4, 1848);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(fa, div, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(fa.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(fa.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(fa);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(43:19)      <!-- Put Loading Animation Here-->     <div class=\\\"loading\\\">         <Fa icon={faSpinner}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let await_block_anchor;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 0,
		error: 1,
		blocks: [,,,]
	};

	handle_promise(getToken(), info);

	const block = {
		c: function create() {
			await_block_anchor = empty();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			update_await_block_branch(info, ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
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
	validate_slots('InitApp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<InitApp> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ getToken, Fa, faSpinner, Router, routes });
	return [];
}

class InitApp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "InitApp",
			options,
			id: create_fragment.name
		});
	}
}

const app = new InitApp({
	target: document.body,
	props: {
		name: 'world'
	}
});

export { createEventDispatcher as $, create_component as A, mount_component as B, add_flush_callback as C, update_await_block_branch as D, transition_in as E, Fa as F, transition_out as G, destroy_component as H, empty as I, HtmlTag as J, assign as K, set_svg_attributes as L, get_spread_update as M, create_slot as N, toggle_class as O, update_slot_base as P, get_all_dirty_from_scope as Q, get_slot_changes as R, SvelteComponentDev as S, globals as T, URI_SETTING as U, group_outros as V, check_outros as W, validate_each_argument as X, destroy_each as Y, listen_dev as Z, run_all as _, svg_element as a, set_input_value as a0, add_render_callback as a1, add_resize_listener as a2, src_url_equal as a3, onMount as a4, faCopyright as a5, set_data_dev as a6, afterUpdate as a7, now as a8, loop as a9, truncText as aA, prop_dev as aB, URI_SPOTIFY_LIST as aC, fixSpotifyLink as aD, URI_REWARA_DETAIL as aE, app as aF, validate_store as aa, component_subscribe as ab, params as ac, URI_ARTICLE_DETAIL as ad, URI_ARTICLE_LIST as ae, stringToDom as af, get_spread_object as ag, compute_rest_props as ah, exclude_internal_props as ai, faShare as aj, URI_SEARCH as ak, URI_DEDUKTIF_DETAIL as al, URI_DEDUKTIF_LIST as am, URI_INFOGRAM_LIST as an, URI_REWARA_LIST as ao, URI_LAST_TOPIC as ap, tick as aq, faCameraAlt as ar, xlink_attr as as, URI_NEWS_TOP_ENTITY as at, URI_ENTITY_PROFILE as au, URI_ENTITY_VOICES as av, URI_NEWS_STATEMENT_LIST as aw, URI_NEWS_LIST as ax, writable as ay, identity as az, space as b, add_location as c, dispatch_dev as d, element as e, attr_dev as f, set_style as g, insert_dev as h, init$1 as i, append_dev as j, action_destroyer as k, detach_dev as l, derived as m, noop as n, binding_callbacks as o, bind$1 as p, handle_promise as q, readable as r, safe_not_equal as s, text as t, get as u, validate_slots as v, ihttp as w, faSpinner as x, faAngleLeft as y, faAngleRight as z };
//# sourceMappingURL=main-477e1cc7.js.map
