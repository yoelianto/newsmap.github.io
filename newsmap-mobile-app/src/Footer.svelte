<script>
    import Fa from 'svelte-fa'
    import { faTiktok, faInstagram, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
    import { faCopyright } from '@fortawesome/free-solid-svg-icons'
    import { link } from "svelte-spa-router";
    import {onMount} from 'svelte'

    let now = new Date(), year;
	let dateString;
	
	onMount(()=> {
        year = now.getFullYear();

    dateString = [year].join('-');
	})
</script>

<footer>
    <div class="divider"></div>
    <section>
        <div class="menu">
            <div class="left">
                <a href={`/about/`} use:link>
                    <p>Tentang Kami</p>
                </a>
                <a href={`/redaksi/`} use:link>
                    <p>Redaksi</p>
                </a>
                <a href=''> <!-- DISCORD LINK HERE -->
                    <p>Klub Sosial Jurno</p>
                </a>
            </div>

            <div class="right">
                <a href={`/article/`} use:link>
                    <p>Jurno Original</p>
                </a>
                <a href={`/deduktif/`} use:link>
                    <p>Deduktif</p>
                </a>
                <a href={`/infogram/`} use:link>
                    <p>Infosight</p>
                </a>
    
                
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
        </div>
        <div class="bottom">
            <p>
                PT Ide Digital Inventura <Fa icon={faCopyright} /> {dateString}
            </p>
        </div>
    </section>

</footer>

<style>
    footer {
        width:100%;
        background-color: hsl(0,0%,93%);
        padding-bottom: 120px;
        position: relative;
    }
    .divider {
        background-color: var(--color-brand-white);
        width:100%;
        height:3rem;
        border-radius: 0 0 2rem 2rem;
        position: absolute;
        top:-1rem;
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
        color: hsl(0,0%,50%);
        white-space: normal;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .menu {
        width:90%;
        display: flex;
        flex-direction: row;
        margin-left:20px;
        justify-content: space-between;
    }
    .sosmed {
        margin-top: 1rem;
        display: flex;
        color: hsl(0,0%,50%);
    }
    .sm {
        margin-right: 0.5rem;
        color:hsl(0,0%,50%);
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
        color:var(--color-brand-white)
    }
    a:hover {
        color:var(--color-brand-dark-blue)
    }
</style>