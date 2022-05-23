
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, o as binding_callbacks, p as bind, q as handle_promise, v as validate_slots, a7 as afterUpdate, u as get, w as ihttp, F as Fa, x as faSpinner, y as faAngleLeft, z as faAngleRight, b as space, e as element, A as create_component, f as attr_dev, c as add_location, g as set_style, h as insert_dev, B as mount_component, j as append_dev, C as add_flush_callback, D as update_await_block_branch, E as transition_in, G as transition_out, l as detach_dev, H as destroy_component, U as URI_SETTING, T as globals, n as noop, I as empty, J as HtmlTag } from './main-477e1cc7.js';
import { H as Head } from './Head-bc165711.js';
import { F as Footer } from './Footer-06c38500.js';
import { a as animateScroll, s as scrollToTop } from './index-bc0e1ad4.js';
import './Router-29db7ec6.js';

/* src\pages\AboutDeduktif.svelte generated by Svelte v3.46.4 */

const { document: document_1 } = globals;

const file = "src\\pages\\AboutDeduktif.svelte";

// (50:8) {:catch error}
function create_catch_block(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "An error occurred!";
			add_location(p, file, 50, 12, 1364);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(50:8) {:catch error}",
		ctx
	});

	return block;
}

// (48:8) {:then data}
function create_then_block(ctx) {
	let html_tag;
	let raw_value = /*data*/ ctx[6][1].value + "";
	let html_anchor;

	const block = {
		c: function create() {
			html_tag = new HtmlTag();
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m: function mount(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert_dev(target, html_anchor, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(html_anchor);
			if (detaching) html_tag.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(48:8) {:then data}",
		ctx
	});

	return block;
}

// (44:28)               <div class="placeholder-container">                  <Fa icon={faSpinner}
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
			attr_dev(div, "class", "placeholder-container svelte-csatn1");
			add_location(div, file, 44, 12, 1157);
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
		source: "(44:28)               <div class=\\\"placeholder-container\\\">                  <Fa icon={faSpinner}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let main;
	let head;
	let updating_height;
	let updating_page;
	let t1;
	let div1;
	let h1;
	let t3;
	let div0;
	let t4;
	let footer;
	let div;
	let updating_page_1;
	let current;

	function head_height_binding(value) {
		/*head_height_binding*/ ctx[3](value);
	}

	function head_page_binding(value) {
		/*head_page_binding*/ ctx[4](value);
	}

	let head_props = {};

	if (/*height*/ ctx[0] !== void 0) {
		head_props.height = /*height*/ ctx[0];
	}

	if (/*page*/ ctx[1] !== void 0) {
		head_props.page = /*page*/ ctx[1];
	}

	head = new Head({ props: head_props, $$inline: true });
	binding_callbacks.push(() => bind(head, 'height', head_height_binding));
	binding_callbacks.push(() => bind(head, 'page', head_page_binding));

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 6,
		error: 7,
		blocks: [,,,]
	};

	handle_promise(/*fetchData*/ ctx[2](), info);

	function footer_page_binding(value) {
		/*footer_page_binding*/ ctx[5](value);
	}

	let footer_props = {};

	if (/*page*/ ctx[1] !== void 0) {
		footer_props.page = /*page*/ ctx[1];
	}

	footer = new Footer({ props: footer_props, $$inline: true });
	binding_callbacks.push(() => bind(footer, 'page', footer_page_binding));

	const block = {
		c: function create() {
			t0 = space();
			main = element("main");
			create_component(head.$$.fragment);
			t1 = space();
			div1 = element("div");
			h1 = element("h1");
			h1.textContent = "Tentang Deduktif";
			t3 = space();
			div0 = element("div");
			info.block.c();
			t4 = space();
			div = element("div");
			create_component(footer.$$.fragment);
			document_1.title = "Tentang Deduktif";
			attr_dev(h1, "class", "svelte-csatn1");
			add_location(h1, file, 40, 4, 1059);
			attr_dev(div0, "class", "content svelte-csatn1");
			add_location(div0, file, 42, 4, 1092);
			attr_dev(div1, "class", "container svelte-csatn1");
			set_style(div1, "margin-top", /*height*/ ctx[0] + "px");
			add_location(div1, file, 38, 0, 998);
			set_style(div, "display", "contents");
			set_style(div, "--color-brand-dark-blue", "#242053");
			set_style(div, "--color-brand-white", "#fafafa");
			set_style(div, "--fontfamily2", "Roboto");
			attr_dev(main, "class", "svelte-csatn1");
			add_location(main, file, 32, 0, 929);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, main, anchor);
			mount_component(head, main, null);
			append_dev(main, t1);
			append_dev(main, div1);
			append_dev(div1, h1);
			append_dev(div1, t3);
			append_dev(div1, div0);
			info.block.m(div0, info.anchor = null);
			info.mount = () => div0;
			info.anchor = null;
			append_dev(main, t4);
			append_dev(main, div);
			mount_component(footer, div, null);
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			const head_changes = {};

			if (!updating_height && dirty & /*height*/ 1) {
				updating_height = true;
				head_changes.height = /*height*/ ctx[0];
				add_flush_callback(() => updating_height = false);
			}

			if (!updating_page && dirty & /*page*/ 2) {
				updating_page = true;
				head_changes.page = /*page*/ ctx[1];
				add_flush_callback(() => updating_page = false);
			}

			head.$set(head_changes);
			update_await_block_branch(info, ctx, dirty);

			if (!current || dirty & /*height*/ 1) {
				set_style(div1, "margin-top", /*height*/ ctx[0] + "px");
			}

			const footer_changes = {};

			if (!updating_page_1 && dirty & /*page*/ 2) {
				updating_page_1 = true;
				footer_changes.page = /*page*/ ctx[1];
				add_flush_callback(() => updating_page_1 = false);
			}

			footer.$set(footer_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(head.$$.fragment, local);
			transition_in(info.block);
			transition_in(footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(head.$$.fragment, local);

			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			transition_out(footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(main);
			destroy_component(head);
			info.block.d();
			info.token = null;
			info = null;
			destroy_component(footer);
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
	validate_slots('AboutDeduktif', slots, []);

	const fetchData = async () => {
		const result = await get(URI_SETTING, { group: 'about' });
		return await result;
	};

	let height;
	let page = 'indeksdeduktif';

	afterUpdate(() => {
		for (const element of document.body.querySelectorAll('main')) {
			if (element.nextElementSibling) {
				element.nextElementSibling.remove();
			}
		}

		scrollToTop();
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AboutDeduktif> was created with unknown prop '${key}'`);
	});

	function head_height_binding(value) {
		height = value;
		$$invalidate(0, height);
	}

	function head_page_binding(value) {
		page = value;
		$$invalidate(1, page);
	}

	function footer_page_binding(value) {
		page = value;
		$$invalidate(1, page);
	}

	$$self.$capture_state = () => ({
		get,
		ihttp,
		Head,
		Footer,
		afterUpdate,
		animateScroll,
		Fa,
		faSpinner,
		faAngleLeft,
		faAngleRight,
		fetchData,
		height,
		page
	});

	$$self.$inject_state = $$props => {
		if ('height' in $$props) $$invalidate(0, height = $$props.height);
		if ('page' in $$props) $$invalidate(1, page = $$props.page);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		height,
		page,
		fetchData,
		head_height_binding,
		head_page_binding,
		footer_page_binding
	];
}

class AboutDeduktif extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AboutDeduktif",
			options,
			id: create_fragment.name
		});
	}
}

export { AboutDeduktif as default };
//# sourceMappingURL=AboutDeduktif-13e71c98.js.map
