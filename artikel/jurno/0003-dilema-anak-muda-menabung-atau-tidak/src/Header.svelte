<script>
    export let title, subtitle, subhead, author, date;
    export let fullHeader = true;
</script>

{#if fullHeader}
    <section>
        <div class="full-header-img">
            <div class="title-section">
                <div class="title">{ title }</div>
                <div class="subtitle">{ subtitle }</div>
                {#each subhead as sub}
                    <div class="subhead">
                        <p>{@html sub}</p>
                    </div>
                    <br>
                {/each}
                <aside class="credit">
                    <div class="author">Oleh <strong>{ author }</strong></div>
                    <div class="tanggal">{ date }</div>
                </aside>
            </div>
            <div class="gradient"></div>
        </div>
    </section>
{:else}
    <section>

        <div class="title-section">
            <div class="title">{ title }</div>
            {#if subtitle}
            <div class="subtitle">{ subtitle }</div>
            {/if}
            <aside class="credit">
                <div class="author">Oleh <strong>{ author }</strong></div>
                <div class="tanggal">{ date }</div>
            </aside>
            {#each subhead as sub}
                    <div class="subhead">{@html sub}</div>
            {/each}
        </div>
    </section>
{/if}

<style>
    .title-section {
        width:90%;
        
        max-width: 600px;
        margin: 3rem auto 5rem auto;
        text-align: center;
        z-index: 1;
        color: var(--titleColor);
    }
    /* .header-img {
        width:100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    } */
    .full-header-img {
        width:100%;
        height:100vh;
        background-color: var(--headerBackground);
        background-image: var(--headerImage);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .gradient {
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
        width:100%;
        height: 100%;
        position: absolute;
    }
    .title {
        font-weight: 700;
        font-size: 4rem;
        margin: 3rem auto 1rem auto;
        font-family: 'Koulen', cursive;
        letter-spacing: 0.1em;
    }
    .subtitle {
        margin: -1rem auto 3rem auto;
        color: var(--subtitleColor);
        font-size: 1.8rem;
        line-height: 3rem;
        font-family: 'Azeret Mono', monospace;
    }
    .subhead {
        font-weight: 300;
        margin: 0 auto 1.2rem auto;
        max-width: 700px;
        line-height: 1.8rem;
        font-family: 'Roboto Mono', monospace;
        color: var(--subheadColor);
        white-space: normal;
    }
    .credit {
        width:100%;
        max-width: 600px;
        margin: 3rem auto 5rem auto;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
    }

    @media only screen and (max-width:420px) {
        .title {
            font-size:3rem;
            margin: 0 auto 0 auto;
            line-height: 2.75rem;
        }
        .subtitle {
            font-size: 1.4rem;
            margin: 0 auto 1rem auto;
        }
        .subhead {
            margin-top: 1.5rem;
            line-height: 1.5rem;
            
        }
        /* .header-img {
            width:100%;
            height:100vw;
        } */
        .title-section {
            margin: 1rem auto 2rem auto;
        }
    }


</style>