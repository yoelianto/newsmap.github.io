<script>
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';
    import Fa from 'svelte-fa'
    import { faTiktok, faInstagram, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
    import { url } from '@roxi/routify'

    export let burgerIn = false
    export let page

    const burgerMenuOut = () => {
        burgerIn = false
    }
</script>

<nav style='left:{ burgerIn ? '0px' : '-160px'}'>
    {#if page == 'indeks'}
    <section>
        <div
            class="close"
            on:click={burgerMenuOut}
        >
            <Icon
                data={angleLeft}
                style='color:#fafafa'
                scale ={1.5}
            />
        </div>
        <div class="menu">
            <a href={$url('/about')}>
                <p>Tentang Kami</p>
            </a>
            <a href={$url('/redaksi')}>
                <p>Redaksi</p>
            </a>
            <a href=''> <!-- DISCORD LINK HERE -->
                <p>Klub Sosial Jurno</p>
            </a>

            <hr class='rounded'>

            <a href={$url('/article')}>
                <p>Jurno Original</p>
            </a>
            <a href={$url('/deduktif')}>
                <p>Deduktif</p>
            </a>
            <a href={$url('/paralaks')}>
                <p>Paralaks</p>
            </a>

            <hr class='rounded'>
            
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
        </div>
    </section>
    {:else if page == 'deduktif'}
    <section>
        <div
            class="close"
            on:click={burgerMenuOut}
        >
            <Icon
                data={angleLeft}
                style='color:#fafafa'
                scale ={1.5}
            />
        </div>
        <div class="menu">
            <a href={$url('/deduktif')}>
                <p>Laporan</p>
            </a>
            <a href={$url('/deduktif/about')}>
                <p>Tentang Kami</p>
            </a>
            <a href={$url('/deduktif/redaksi')}>
                <p>Redaksi</p>
            </a>

            <hr class='rounded'>
            
            <div class="sosmed">
                <a href='https://twitter.com/deduktifid' > <!-- TWITTER LINK HERE -->
                    <div class="sm tw">
                        <Fa icon={faTwitter} />
                    </div>
                </a>
            </div>
        </div>
    </section>
    {:else if page == 'indeksdeduktif'}
    <section>
        <div
            class="close"
            on:click={burgerMenuOut}
            style='cursor:pointer'
        >
            <Icon
                data={angleLeft}
                style='color:#fafafa'
                scale ={1.5}
            />
        </div>
        <div class="menu">
            <a href={$url('/deduktif')}>
                <p>Laporan</p>
            </a>
            <a href={$url('/deduktif/about')}>
                <p>Tentang Kami</p>
            </a>
            <a href={$url('/deduktif/redaksi')}>
                <p>Redaksi</p>
            </a>

            <hr class='rounded'>
            
            <div class="sosmed">
                <a href='https://twitter.com/deduktifid' > <!-- TWITTER LINK HERE -->
                    <div class="sm tw">
                        <Fa icon={faTwitter} />
                    </div>
                </a>
            </div>
        </div>
    </section>
    {/if}
</nav>

<style>
    nav {
        top:0;
        width:160px;
        height:100vh;
        z-index:1001;
        position: fixed;
        background-color: var(--color-brand-red);
        transition: left 200ms ease-in-out;
    }
    section {
        width:90%;
        height:50vh;
    }
    hr.rounded {
        border-top: 1px solid var(--color-brand-white);
        border-radius: 1px;
        width:100%
    }
    .close {
        width:100%;
        height:calc(25px + 0.6rem);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .menu {
        width:90%;
        display: flex;
        flex-direction: column;
        margin-left:20px;
    }
    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .sosmed {
        margin-top: 1rem;
        display: flex;
    }

    .sm {
        margin-right: 0.5rem;
        color:var(--color-brand-white)
    }
    .sm:hover {
        color:var(--color-brand-dark-blue)
    }
    a{
        color:var(--color-brand-white)
    }
    a:hover {
        color:var(--color-brand-dark-blue)
    }
</style>