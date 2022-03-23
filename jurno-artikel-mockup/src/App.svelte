<script>
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';

	// scroller
	import Scroller from '@sveltejs/svelte-scroller';
	// scroller variables
	let count, index, offset, progress;
	let top = 0;
	let threshold = 0;
	let bottom = 1;

	// styling variables
	let mainBackground='white'
	let headerImage='url("https://rupadata.id/wp-content/uploads/2021/02/header-artikel-plta-kayan.jpg")'
	let headerBackground='#888'
	let titleColor='black'
	let subtitleColor='#666'
	let subheadColor='#888'

	let credit =[{
		role : 'Penulis',
		name : 'Lorem Ipsum'
		},{
		role : 'Editor',
		name : 'Lorem Ipsum'
		},{
		role : 'Periset',
		name : 'Lorem Ipsum'
		}]
	let source = 'Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa'

	let scrollytelling = [
		'Presiden Moon Jae-in kerap membawa grup-grup kpop sebagai pendamping diplomatisnya;',

		'Red Velvet menjadi utusan kebudayaan di konser Korea Utara di tahun 2018,',

		'EXO bertemu dengan Donald Trump di tahun 2019,',

		'dan BTS yang dilantik sebagai diplomat khusus di tahun 2021.',
	]

	// export let name;
</script>

<main style="background-color: {mainBackground}">
	<Header 
		--headerImage={headerImage}
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Diplomasi K-Pop'

		subhead='Suka tidak suka, keberadaan artis dan/atau idola Kpop akan muncul di depan mata Anda. Entah dalam bentuk billboard BTS segede gaban di pinggir jalan, potongan lagu girl/boy group di akun Youtube gratisan, atau idola yang menjadi brand ambassador marketplace. Kedatangan hallyu wave terasa seperti bom yang tiba-tiba meledak.

		Namun yang membuat kpop jauh lebih menarik dari dunia hiburan lainnya adalah dukungan negara yang begitu besar.'

		author='Volutpat Sapien'
		date=''		
	/>	
	
	<div class="divider"></div>
	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
			<div slot="background">
				<p>{scrollytelling[index]}</p>
			</div>

			<div slot="foreground" >
				<section></section>
				<section>
					<p>
						Presiden Moon Jae-in kerap membawa grup-grup kpop sebagai pendamping diplomatisnya;
					</p>
				</section>
				<section>
					<p>
						Red Velvet menjadi utusan kebudayaan di konser Korea Utara di tahun 2018,
					</p>
				</section>
				<section>
					<p>
						EXO bertemu dengan Donald Trump di tahun 2019,
					</p>
				</section>
				<section>
					<p>
						dan BTS yang dilantik sebagai diplomat khusus di tahun 2021.
					</p>
				</section>
			</div>
	</Scroller>
	<div class="divider"></div>
	<Paragraph
		para={[
		'Begitu menguntungkannya hubungan antara kpop dengan pemerintahan Korsel sampai-sampai pemerintah membuat tim khusus untuk mempromosikan kpop ke dunia. Namun kesuksesan ini tak akan eksis tanpa adanya bekingan yang besar ke teknologi pendukung, seperti internet cepat dan modal ke perusahaan-perusahaan teknologi lokal. Ini terlihat di pemetaan dana pemerintah di tahun 2012: sepertiga dari modal usaha negara dihabiskan di industri entertainmen.'
		]}
	/>
	<Image
		img={[
			{
			url:'https://via.placeholder.com/600/92c952',
			title:'accusamus beatae ad facilis cum similique qui sunt'
			}
		]}

		imageTitle='Lorem Ipsum Dolor Sit Amet'
		imageSource='Dokumentasi Pribadi'
	/>
	<Paragraph
		para={[
		'Namun penggunaan kpop sebagai alat diplomasi ini tak selalu positif. Pemerintah Tiongkok memblokir konten kpop dan kdrama karena Korsel membuat perjanjian militer dengan Amerika Serikat. Hasilnya, kpop terpaksa memfokuskan pasarnya ke Asia Pasifik, salah satunya Indonesia. Strategi ini terhitung sukses: Indonesia merupakan negara paling “berisik” (dan mungkin juga salah satu yang paling banyak menggelontorkan uang) soal kpop di dunia maya. '
		]}
	/>
	<Credit { source } { credit }/>
</main>

<style>
	.divider {
		height:4rem;
	}

	[slot="background"] {
		background-color: rgba(255,62,0,0.05);
		height: 100vh;
		border-top: 2px solid #ff3e00;
		border-bottom: 2px solid #ff3e00;
		font-size: 1.4em;
		overflow: hidden;
		padding: 1em;
	}

	[slot="foreground"] section {
		height: 80vh;
		color: black;
		padding: 1em;
		margin: 0 0 2em 0;
	}

	[slot="foreground"] p {
		padding:1rem;
		background-color: white;
		width:90%;
        max-width: 650px;
        margin: 0 auto 0 auto;
        text-align: left;
	}
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	} */

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>