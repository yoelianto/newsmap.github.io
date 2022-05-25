<script>
    import Fa from 'svelte-fa'
    import { faTiktok, faInstagram, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
    import { faCopyright } from '@fortawesome/free-solid-svg-icons'
    import {onMount} from 'svelte'
    import { url } from '@roxi/routify'

    export let page

    let now = new Date(), year;
	let dateString;
	
	onMount(()=> {
        year = now.getFullYear();

    dateString = [year].join('-');
	})
</script>

<footer style="background-color:{page == 'indeksdeduktif' ? '#333' : '#ededed'}">
    <div class="divider" style="background-color:{page == 'indeksdeduktif' ? '#050505' : '#fafafa'}"></div>
    <section style="background-color:{page == 'indeksdeduktif' ? '#333' : '#ededed'}">
        <div class="menu">
            <div class="left">
                {#if page != 'indeksdeduktif'}
                <a href={$url('/about')}>
                    <p>Tentang Kami</p>
                </a>
                <a href={$url('/redaksi')}>
                    <p>Redaksi</p>
                </a>
                <a href=''> <!-- DISCORD LINK HERE -->
                    <p>Klub Sosial Jurno</p>
                </a>
                {:else}
                <a href={$url('/deduktif')}>
                    <p>Laporan</p>
                </a>
                <a href={$url('/deduktif/about')}>
                    <p>Tentang Kami</p>
                </a>
                <a href={$url('/deduktif/redaksi')}>
                    <p>Redaksi</p>
                </a>
                {/if}
            </div>

            <div class="right">
                {#if page != 'indeksdeduktif'}
                    <a href={$url('/article')}>
                        <p>Jurno Original</p>
                    </a>
                    <a href={$url('/deduktif')}>
                        <p>Deduktif</p>
                    </a>
                    <a href={$url('/paralaks')}>
                        <p>Paralaks</p>
                    </a>
                {/if}
    
                {#if page == 'indeksdeduktif'}
                <div class="sosmed">
                    <a href='https://twitter.com/deduktifid' > <!-- TWITTER LINK HERE -->
                        <div class="sm tw">
                            <Fa icon={faTwitter} />
                        </div>
                    </a>
                </div>
                {:else}
                <div class="sosmed">
                    <a href='https://www.instagram.com/jurnoid/'> <!-- INSTAGRAM LINK HERE -->
                        <div class="sm ig">
                            <Fa icon={faInstagram} />
                        </div>
                    </a>
                    <a href=''> <!-- FACEBOOK LINK HERE -->
                        <div class="sm fb">
                            <Fa icon={faFacebook} />
                        </div>
                    </a>
                    <a href='https://twitter.com/jurno_id' > <!-- TWITTER LINK HERE -->
                        <div class="sm tw">
                            <Fa icon={faTwitter} />
                        </div>
                    </a>
                    <a href='https://www.youtube.com/channel/UCSGTUIGbrpONOTayMXAIcqw'> <!-- YOUTUBE LINK HERE -->
                        <div class="sm yt">
                            <Fa icon={faYoutube} />
                        </div>
                    </a>
                    <a href='www.tiktok.com/@jurnoid'> <!-- TIKTOK LINK HERE -->
                        <div class="sm tt">
                            <Fa icon={faTiktok} />
                        </div>
                    </a> 
                </div>
                {/if}
            </div>
        </div>
        <div class="bottom">
            {#if page == 'indeksdeduktif'}
                <p>
                    PT Deduktif Warta Mardika <Fa icon={faCopyright} /> {dateString}
                </p>
            {:else}
                <p>
                    PT Ide Digital Inventura <Fa icon={faCopyright} /> {dateString}
                </p>
            {/if}
           
        </div>
    </section>
</footer>

<style>
    footer {
        width:100%;
        padding-bottom: 120px;
        position: relative;
    }
    .divider {
        width:100%;
        height:3rem;
        border-radius: 0 0 2rem 2rem;
        position: absolute;
        top:-1.01rem;
    }
    .bottom {
        margin-top: 2rem;
        width:100%;
        text-align: center;
    }
    section {
        width:88%;
        margin:0 auto;
        padding-top: 3rem;
    }
    p {
        width:100%;
        font-size: 0.8rem;
        font-family: var(--fontfamily2);
        color: hsl(0,0%,50%) !important;
        white-space: normal;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        text-decoration: none !important;
    }
    .menu {
        width:90%;
        max-width:450px;
        display: flex;
        flex-direction: row;
        margin-left:auto;
        margin-right:auto;
        justify-content: space-between;
    }
    .sosmed {
        margin-top: 1rem;
        display: flex;
        color: hsl(0,0%,50%) !important;
    }
    .sm {
        margin-right: 0.5rem;
        color:hsl(0,0%,50%) !important;
    }
    .left {
        width:45%;
    }
    .right {
        width:45%;
    }

    .sm:hover {
        color:var(--color-brand-dark-blue)
    }
    a{
        text-decoration: none !important;
    }
</style>