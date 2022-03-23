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
	let threshold = 0.5;
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
		'Cras pretium gravida mollis. Sed metus nibh, maximus id lectus ac, malesuada tincidunt lorem. Curabitur mattis efficitur mauris, sed fringilla erat ullamcorper euismod. Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa. Suspendisse a neque lacinia, pulvinar enim sed, efficitur nisl.',

		'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque consequuntur repellat facilis deserunt temporibus labore nobis asperiores ea provident nihil nesciunt totam dicta soluta mollitia, quae hic sequi reprehenderit accusamus velit, quidem, voluptas perspiciatis id inventore quas? Iste dolorum aliquam eligendi unde placeat ipsam laudantium architecto itaque veritatis aliquid vero quos earum debitis iusto, suscipit impedit a sit nisi qui.',

		'Iste dolorum aliquam eligendi unde placeat ipsam laudantium architecto itaque veritatis aliquid vero quos earum debitis iusto, suscipit impedit a sit nisi qui.',

		'Cras pretium gravida mollis. Sed metus nibh, maximus id lectus ac, malesuada tincidunt lorem. Curabitur mattis efficitur mauris, sed fringilla erat ullamcorper euismod. Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa. Suspendisse a neque lacinia, pulvinar enim sed, efficitur nisl.',

		'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque consequuntur repellat facilis deserunt temporibus labore nobis asperiores ea provident nihil nesciunt totam dicta soluta mollitia, quae hic sequi reprehenderit accusamus velit, quidem, voluptas perspiciatis id inventore quas? Iste dolorum aliquam eligendi unde placeat ipsam laudantium architecto itaque veritatis aliquid vero quos earum debitis iusto, suscipit impedit a sit nisi qui.'
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

		title='Vivamus finibus leo non hendrerit ultrices'

		subtitle='Morbi porttitor efficitur egestas'

		subhead='Cras pretium gravida mollis. Sed metus nibh, maximus id lectus ac, malesuada tincidunt lorem. Curabitur mattis efficitur mauris, sed fringilla erat ullamcorper euismod. Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa. Suspendisse a neque lacinia, pulvinar enim sed, efficitur nisl.'

		author='Volutpat Sapien'
		date=''		
	/>	
	<Paragraph
		subjudul='Vestibulum'
		para={[
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor efficitur egestas. Vivamus finibus leo non hendrerit ultrices. Nulla facilisi. Aliquam sodales, ante eget malesuada ullamcorper, orci orci posuere magna, ut malesuada nisl felis et orci.',

		'Quisque justo felis, semper id odio in, venenatis volutpat sapien. Maecenas accumsan erat id fringilla consequat. Quisque leo dolor, volutpat a mattis et, bibendum ac nisi. Mauris facilisis nisi ac sem maximus, ut commodo mi dignissim. Donec mattis ipsum sed lorem ultrices, eget vulputate nisl vehicula. Maecenas consectetur volutpat gravida. Ut sollicitudin purus a suscipit tempor.', 

		'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vitae tincidunt purus, dapibus tempus arcu. Vestibulum nec leo iaculis magna tristique maximus nec id justo. Aliquam porttitor nec nisl sed laoreet. Proin blandit dolor id ipsum bibendum, eget mattis sem finibus.'
		]}
	/>
	<Quote 
		imgurl =''
		imgalt =''
		quotes ='Cras pretium gravida mollis. Sed metus nibh, maximus id lectus ac, malesuada tincidunt lorem. Curabitur mattis efficitur mauris'
		person ='Lorem Ipsum'
		credential ='Dolor Sit Amet'
	/>
	<Image
		img={[
			{
			url:'https://via.placeholder.com/600/92c952',
			title:'accusamus beatae ad facilis cum similique qui sunt'
			},
			{
			url:'https://via.placeholder.com/600/92c952',
			title:'accusamus beatae ad facilis cum similique qui sunt'
			},
			{
			url:'https://via.placeholder.com/600/92c952',
			title:'accusamus beatae ad facilis cum similique qui sunt'
			}
		]}

		imageTitle='Lorem Ipsum Dolor Sit Amet'
		imageSource='Dokumentasi Pribadi'
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis deserunt ut ratione autem sint corporis harum consequuntur atque cupiditate fuga!
					</p>
				</section>
				<section>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, rem! Natus deserunt nesciunt explicabo repudiandae, suscipit qui ut blanditiis mollitia itaque id. Placeat in perferendis quibusdam enim voluptas. Sapiente, sequi!
					</p>
				</section>
				<section>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. A magnam, officiis eius voluptates asperiores laudantium.
					</p>
				</section>
				<section>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ducimus nesciunt esse earum laboriosam laudantium provident voluptatem eaque sed. Dolore.
					</p>
				</section>
				<section>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus commodi suscipit assumenda illum dolor reprehenderit. Veniam rem eligendi unde vero amet deleniti repellendus est consequatur, maiores hic magnam architecto illo.
					</p>
				</section>
			</div>
	</Scroller>
	<div class="divider"></div>
	<Paragraph
		subjudul='Vestibulum'
		para={[
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor efficitur egestas. Vivamus finibus leo non hendrerit ultrices. Nulla facilisi. Aliquam sodales, ante eget malesuada ullamcorper, orci orci posuere magna, ut malesuada nisl felis et orci.',

		'Quisque justo felis, semper id odio in, venenatis volutpat sapien. Maecenas accumsan erat id fringilla consequat. Quisque leo dolor, volutpat a mattis et, bibendum ac nisi. Mauris facilisis nisi ac sem maximus, ut commodo mi dignissim. Donec mattis ipsum sed lorem ultrices, eget vulputate nisl vehicula. Maecenas consectetur volutpat gravida. Ut sollicitudin purus a suscipit tempor.', 

		'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vitae tincidunt purus, dapibus tempus arcu. Vestibulum nec leo iaculis magna tristique maximus nec id justo. Aliquam porttitor nec nisl sed laoreet. Proin blandit dolor id ipsum bibendum, eget mattis sem finibus.'
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