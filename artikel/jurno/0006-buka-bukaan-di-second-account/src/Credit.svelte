<script>
    export let credit=[];
    export let source;

</script>

<section>
    <div class="section-bar"></div>
    {#each credit as person}
        <div class="profile" id="p1">
            <div class="profpic"></div>
            <div class="profname">
                <div class="role">{ person.role }</div>
                <div class="name">{ person.name}</div>
            </div>
        </div>
        <div class="profile-bar"></div>
    {/each} 
    
    <br>
    {#if source}
    Sumber: { source }<br>
    {/if}

</section>

<style>
section {
    color: var(--font-color);
    font-size: 1rem;
    line-height: 2rem;
    width:90%;
    max-width: 650px;
    margin: auto;
    padding-bottom: 2rem;
}

.profile {
    display: flex;
    width: 80%;
    margin: auto;
}

.profile > div {
    margin:1rem;
}

.profpic {
    background-color: rgb(200,200,200);
    width:100px;
    height: 100px;
    border-radius: 50%;
}

.profname {
    margin-left: 30px!important;
}

.name {
    font-size: 2rem;
    font-family: var(--fontfamily1);
    font-weight: 700;
}

.profile-bar {
    background-color: rgb(200,200,200);
    width:100%;
    height:2px;
    max-width: 650px;
    border-radius: 1px;
}

.section-bar {
    background-color: rgb(200,200,200);
    width:100%;
    height:4px;
    max-width: 650px;
    margin: 5rem auto auto auto;
    border-radius: 2px;
}
@media screen and (max-width: 720px) {
    section{
        font-size: 0.9rem;
        line-height: 1.8rem;
    }
    .profile {
        display: flex;
        width: 100%;
        margin: auto;
    }
    
    .profile > div {
        margin:1rem;
    }

    .profpic {
        background-color: rgb(200,200,200);
        width:80px!important;
        height: 80px!important;
        border-radius: 50%;
    }
    
    .profname {
        margin-left: 5px!important;
    }
    
    .name {
        font-size: 1.2rem;
        font-family: "Noto Sans", sans-serif;
        font-weight: 700;
    }

}
</style>