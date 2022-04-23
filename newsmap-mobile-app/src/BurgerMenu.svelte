<script>
    import Icon from 'svelte-awesome';
    import { angleLeft, instagram, twitter, facebook, youtubePlay } from 'svelte-awesome/icons';
    import { link } from "svelte-spa-router";

    export let burgerIn = false

    const burgerMenuOut = () => {
        burgerIn = false
    }
</script>

<nav style='left:{ burgerIn ? '0px' : '-160px'}'>
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
            <a href={`/about/`} use:link>
                <p>Tentang Kami</p>
            </a>
            <a href={`/contact/`} use:link>
                <p>Kontak</p>
            </a>
            <a href={`/redaksi/`} use:link>
                <p>Redaksi</p>
            </a>
            <a href=''> <!-- DISCORD LINK HERE -->
                <p>Klub Sosial Jurno</p>
            </a>

            <hr class='rounded'>

            <a href={`/article/`} use:link>
                <p>Jurno Original</p>
            </a>
            <a href={`/deduktif/`} use:link>
                <p>Deduktif</p>
            </a>
            <a href={`/infogram/`} use:link>
                <p>Infogram</p>
            </a>

            <hr class='rounded'>
            
            <div class="sosmed">
                <a href='https://www.instagram.com/jurnoid/'> <!-- INSTAGRAM LINK HERE -->
                    <div class="sm ig">
                        <Icon
                            data={instagram} scale ={1.5}
                        />
                    </div>
                </a>
                <a href=''> <!-- FACEBOOK LINK HERE -->
                    <div class="sm fb">
                        <Icon
                            data={facebook} scale ={1.5}
                        />
                    </div>
                </a>
                <a href='https://twitter.com/jurno_id' > <!-- TWITTER LINK HERE -->
                    <div class="sm tw">
                        <Icon
                            data={twitter} scale ={1.5}
                        />
                    </div>
                </a>
                <a href=''> <!-- YOUTUBE LINK HERE -->
                    <div class="sm yt">
                        <Icon
                            data={youtubePlay} scale ={1.5}
                        />
                    </div>
                </a>     
            </div>
        </div>
    </section>
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
        height:calc(35px + 1rem);
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