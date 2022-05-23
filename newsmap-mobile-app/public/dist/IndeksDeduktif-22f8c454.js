
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, o as binding_callbacks, p as bind, q as handle_promise, v as validate_slots, a4 as onMount, a7 as afterUpdate, u as get, w as ihttp, b as space, e as element, A as create_component, f as attr_dev, c as add_location, g as set_style, h as insert_dev, B as mount_component, j as append_dev, a0 as set_input_value, Z as listen_dev, C as add_flush_callback, D as update_await_block_branch, E as transition_in, G as transition_out, l as detach_dev, H as destroy_component, _ as run_all, am as URI_DEDUKTIF_LIST, ak as URI_SEARCH, T as globals, X as validate_each_argument, n as noop, I as empty, t as text, a3 as src_url_equal, k as action_destroyer, a6 as set_data_dev, Y as destroy_each } from './main-1d28085c.js';
import { H as Head } from './Head-9bde3955.js';
import { a as animateScroll, s as scrollToTop } from './index-b6dab8e7.js';
import { l as link } from './Router-3cee6396.js';

/* src\pages\IndeksDeduktif.svelte generated by Svelte v3.46.4 */

const { document: document_1 } = globals;
const file = "src\\pages\\IndeksDeduktif.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (96:4) {:catch error}
function create_catch_block(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "an error occured";
			add_location(p, file, 96, 4, 3076);
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
		source: "(96:4) {:catch error}",
		ctx
	});

	return block;
}

// (76:4) {:then data}
function create_then_block(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*data*/ ctx[14].length > 0) return create_if_block;
		if (/*data*/ ctx[14].length == 0) return create_if_block_1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(76:4) {:then data}",
		ctx
	});

	return block;
}

// (93:35) 
function create_if_block_1(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "Artikel tidak ditemukan";
			set_style(p, "text-align", "center");
			set_style(p, "font-size", "0.8rem");
			add_location(p, file, 93, 8, 2960);
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
		id: create_if_block_1.name,
		type: "if",
		source: "(93:35) ",
		ctx
	});

	return block;
}

// (77:8) {#if data.length > 0}
function create_if_block(ctx) {
	let each_1_anchor;
	let each_value_1 = /*data*/ ctx[14];
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
			if (dirty & /*dataPromise*/ 8) {
				each_value_1 = /*data*/ ctx[14];
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
		id: create_if_block.name,
		type: "if",
		source: "(77:8) {#if data.length > 0}",
		ctx
	});

	return block;
}

// (78:8) {#each data as d}
function create_each_block_1(ctx) {
	let a;
	let div2;
	let div0;
	let img;
	let img_src_value;
	let img_alt_value;
	let t0;
	let div1;
	let p0;
	let t1_value = /*d*/ ctx[11].author_name + "";
	let t1;
	let t2;
	let p1;
	let t3_value = /*d*/ ctx[11].title + "";
	let t3;
	let t4;
	let a_href_value;
	let mounted;
	let dispose;

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

			if (!src_url_equal(img.src, img_src_value = `${({
				"env": {
					"DOMAIN": "https://admin-dev.jurno.id/",
					"URL_API": "https://api-dev.jurno.id/api/newsmap/v1/",
					"URL_IMAGE": "https://admin-dev.newsmap.id/uploads/",
					"URL_CUSTOM_HTML": "https://admin-dev.newsmap.id/files/",
					"NO_IMAGE": "./image/logo-jurno-web.svg",
					"isProd": false
				}
			})['env']['URL_IMAGE']}images/deduktif/${/*d*/ ctx[11].thumbnail}`)) attr_dev(img, "src", img_src_value);

			attr_dev(img, "alt", img_alt_value = /*d*/ ctx[11].title);
			attr_dev(img, "class", "svelte-1wduad2");
			add_location(img, file, 81, 20, 2300);
			attr_dev(div0, "class", "left svelte-1wduad2");
			add_location(div0, file, 80, 16, 2260);
			attr_dev(p0, "class", "author svelte-1wduad2");
			add_location(p0, file, 84, 20, 2693);
			attr_dev(p1, "class", "article-title svelte-1wduad2");
			add_location(p1, file, 85, 20, 2752);
			attr_dev(div1, "class", "credit svelte-1wduad2");
			add_location(div1, file, 83, 16, 2651);
			attr_dev(div2, "class", "article svelte-1wduad2");
			add_location(div2, file, 79, 12, 2221);
			set_style(a, "cursor", "pointer");
			attr_dev(a, "href", a_href_value = `/deduktif/${/*d*/ ctx[11].slug}`);
			attr_dev(a, "class", "svelte-1wduad2");
			add_location(a, file, 78, 8, 2143);
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

			if (!mounted) {
				dispose = action_destroyer(link.call(null, a));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*dataPromise*/ 8 && !src_url_equal(img.src, img_src_value = `${({
				"env": {
					"DOMAIN": "https://admin-dev.jurno.id/",
					"URL_API": "https://api-dev.jurno.id/api/newsmap/v1/",
					"URL_IMAGE": "https://admin-dev.newsmap.id/uploads/",
					"URL_CUSTOM_HTML": "https://admin-dev.newsmap.id/files/",
					"NO_IMAGE": "./image/logo-jurno-web.svg",
					"isProd": false
				}
			})['env']['URL_IMAGE']}images/deduktif/${/*d*/ ctx[11].thumbnail}`)) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*dataPromise*/ 8 && img_alt_value !== (img_alt_value = /*d*/ ctx[11].title)) {
				attr_dev(img, "alt", img_alt_value);
			}

			if (dirty & /*dataPromise*/ 8 && t1_value !== (t1_value = /*d*/ ctx[11].author_name + "")) set_data_dev(t1, t1_value);
			if (dirty & /*dataPromise*/ 8 && t3_value !== (t3_value = /*d*/ ctx[11].title + "")) set_data_dev(t3, t3_value);

			if (dirty & /*dataPromise*/ 8 && a_href_value !== (a_href_value = `/deduktif/${/*d*/ ctx[11].slug}`)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(78:8) {#each data as d}",
		ctx
	});

	return block;
}

// (62:24)           {#each placeholder as d}
function create_pending_block(ctx) {
	let each_1_anchor;
	let each_value = /*placeholder*/ ctx[4];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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
		p: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(62:24)           {#each placeholder as d}",
		ctx
	});

	return block;
}

// (63:8) {#each placeholder as d}
function create_each_block(ctx) {
	let div3;
	let div1;
	let div0;
	let t0;
	let div2;
	let p0;
	let t1;
	let p1;
	let t2;
	let p2;
	let t3;
	let p3;
	let t4;

	const block = {
		c: function create() {
			div3 = element("div");
			div1 = element("div");
			div0 = element("div");
			t0 = space();
			div2 = element("div");
			p0 = element("p");
			t1 = space();
			p1 = element("p");
			t2 = space();
			p2 = element("p");
			t3 = space();
			p3 = element("p");
			t4 = space();
			attr_dev(div0, "class", "placeholder img svelte-1wduad2");
			add_location(div0, file, 65, 16, 1686);
			attr_dev(div1, "class", "left svelte-1wduad2");
			add_location(div1, file, 64, 12, 1650);
			attr_dev(p0, "class", "placeholder author svelte-1wduad2");
			add_location(p0, file, 68, 16, 1793);
			attr_dev(p1, "class", "placeholder article-title svelte-1wduad2");
			add_location(p1, file, 69, 16, 1845);
			attr_dev(p2, "class", "placeholder article-title svelte-1wduad2");
			add_location(p2, file, 70, 16, 1904);
			attr_dev(p3, "class", "placeholder article-title svelte-1wduad2");
			add_location(p3, file, 71, 16, 1963);
			attr_dev(div2, "class", "credit svelte-1wduad2");
			add_location(div2, file, 67, 12, 1755);
			attr_dev(div3, "class", "article svelte-1wduad2");
			add_location(div3, file, 63, 8, 1615);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div1);
			append_dev(div1, div0);
			append_dev(div3, t0);
			append_dev(div3, div2);
			append_dev(div2, p0);
			append_dev(div2, t1);
			append_dev(div2, p1);
			append_dev(div2, t2);
			append_dev(div2, p2);
			append_dev(div2, t3);
			append_dev(div2, p3);
			append_dev(div3, t4);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(63:8) {#each placeholder as d}",
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
	let article;
	let h1;
	let t3;
	let form;
	let input;
	let t4;
	let button;
	let t6;
	let promise;
	let current;
	let mounted;
	let dispose;

	function head_height_binding(value) {
		/*head_height_binding*/ ctx[6](value);
	}

	function head_page_binding(value) {
		/*head_page_binding*/ ctx[7](value);
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
		value: 14,
		error: 17
	};

	handle_promise(promise = /*dataPromise*/ ctx[3], info);

	const block = {
		c: function create() {
			t0 = space();
			main = element("main");
			create_component(head.$$.fragment);
			t1 = space();
			article = element("article");
			h1 = element("h1");
			h1.textContent = "DEDUKTIF";
			t3 = space();
			form = element("form");
			input = element("input");
			t4 = space();
			button = element("button");
			button.textContent = "Search";
			t6 = space();
			info.block.c();
			document_1.title = "Deduktif - Indeks";
			attr_dev(h1, "class", "svelte-1wduad2");
			add_location(h1, file, 56, 4, 1343);
			attr_dev(input, "type", "search");
			attr_dev(input, "placeholder", "Cari Artikel Deduktif...");
			attr_dev(input, "class", "svelte-1wduad2");
			add_location(input, file, 58, 8, 1382);
			attr_dev(button, "type", "submit");
			attr_dev(button, "class", "svelte-1wduad2");
			add_location(button, file, 59, 8, 1477);
			attr_dev(form, "class", "svelte-1wduad2");
			add_location(form, file, 57, 4, 1366);
			set_style(article, "margin-top", /*height*/ ctx[0] + "px");
			attr_dev(article, "class", "svelte-1wduad2");
			add_location(article, file, 55, 0, 1298);
			attr_dev(main, "class", "svelte-1wduad2");
			add_location(main, file, 50, 0, 1238);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, main, anchor);
			mount_component(head, main, null);
			append_dev(main, t1);
			append_dev(main, article);
			append_dev(article, h1);
			append_dev(article, t3);
			append_dev(article, form);
			append_dev(form, input);
			set_input_value(input, /*searchValue*/ ctx[2]);
			append_dev(form, t4);
			append_dev(form, button);
			append_dev(article, t6);
			info.block.m(article, info.anchor = null);
			info.mount = () => article;
			info.anchor = null;
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[8]),
					listen_dev(button, "click", /*search*/ ctx[5], false, false, false)
				];

				mounted = true;
			}
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

			if (dirty & /*searchValue*/ 4) {
				set_input_value(input, /*searchValue*/ ctx[2]);
			}

			info.ctx = ctx;

			if (dirty & /*dataPromise*/ 8 && promise !== (promise = /*dataPromise*/ ctx[3]) && handle_promise(promise, info)) ; else {
				update_await_block_branch(info, ctx, dirty);
			}

			if (!current || dirty & /*height*/ 1) {
				set_style(article, "margin-top", /*height*/ ctx[0] + "px");
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(head.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(head.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(main);
			destroy_component(head);
			info.block.d();
			info.token = null;
			info = null;
			mounted = false;
			run_all(dispose);
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
	validate_slots('IndeksDeduktif', slots, []);
	let height;
	let page = 'indeksdeduktif';
	let placeholder = [1, 2, 3, 4, 5, 6];
	let searchValue;

	const fetchData = async () => {
		const result = await get(URI_DEDUKTIF_LIST, { size: 10 });
		return await result.data;
	};

	const searchData = async () => {
		let searchResult = await get(URI_SEARCH, { keywords: searchValue, type: 'deduktif' });
		return searchResult.data;
	};

	let dataPromise = fetchData();

	const search = () => {
		$$invalidate(3, dataPromise = searchData());
	};

	onMount(() => {
		scrollToTop();
	});

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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IndeksDeduktif> was created with unknown prop '${key}'`);
	});

	function head_height_binding(value) {
		height = value;
		$$invalidate(0, height);
	}

	function head_page_binding(value) {
		page = value;
		$$invalidate(1, page);
	}

	function input_input_handler() {
		searchValue = this.value;
		$$invalidate(2, searchValue);
	}

	$$self.$capture_state = () => ({
		get,
		ihttp,
		Head,
		animateScroll,
		afterUpdate,
		onMount,
		link,
		height,
		page,
		placeholder,
		searchValue,
		fetchData,
		searchData,
		dataPromise,
		search
	});

	$$self.$inject_state = $$props => {
		if ('height' in $$props) $$invalidate(0, height = $$props.height);
		if ('page' in $$props) $$invalidate(1, page = $$props.page);
		if ('placeholder' in $$props) $$invalidate(4, placeholder = $$props.placeholder);
		if ('searchValue' in $$props) $$invalidate(2, searchValue = $$props.searchValue);
		if ('dataPromise' in $$props) $$invalidate(3, dataPromise = $$props.dataPromise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		height,
		page,
		searchValue,
		dataPromise,
		placeholder,
		search,
		head_height_binding,
		head_page_binding,
		input_input_handler
	];
}

class IndeksDeduktif extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "IndeksDeduktif",
			options,
			id: create_fragment.name
		});
	}
}

export { IndeksDeduktif as default };
//# sourceMappingURL=IndeksDeduktif-22f8c454.js.map
