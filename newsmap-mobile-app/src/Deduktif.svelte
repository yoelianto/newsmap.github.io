<script>
    export let title;
    export let authorprofileimage, authorprofilealt, author, deduktifheader;
</script>


<div class="container" id="deduktif">
    <div class="bottom">
        <div class="content">
            <div class="contentbot">
                <div class="left">
                    <div class="profile">
                        <img class="authorprofile" src={authorprofileimage} alt={authorprofilealt}>
                    </div>
                </div>
                <div class="right">
                    <div class="excerpt">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo doloribus maxime exercitationem, distinctio est aperiam eveniet ullam assumenda quae corporis voluptatum quasi consequuntur impedit! Quaerat?
                    </div>                
                </div>
            </div>
            <div class="contenttop">
                
                <div class="headline">
                    <img class="header" src={deduktifheader} alt="" >
                    <div class="headerbottom"></div>
                    <div class="detail">
                        <div class="author">oleh {author}</div>
                        <div class="title">{title}</div>   
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p class="deduktif">DEDUKTIF</p>
</div>


<style>
    .deduktif {
        font-family: var(--fontfamily1);
        font-weight:700;
        font-size:1.5rem;
        margin-left: 6%;
        margin-top: 1rem;
        margin-bottom:40vw;
        color: #242053;
    }
    .container {
        display: flex;
        flex-direction: column-reverse;
        height:100vw;
    }
    .bottom {
        display: flex;
        flex-direction: row;
        background-color: #ef5959;
        height: 50vw;
        border-radius: 0 0 0 2rem;
    }
    .headerbottom{
        background: linear-gradient(0deg, rgba(36,32,83,0.9) 0%, rgba(36,32,83,0) 100%);
        width: 100%;
        position: absolute;
        bottom: 0;
        height:70%;
        border-radius:0 0 0.5rem 0.5rem;
    }
    .content {
        width:88vw;
        margin:0 auto;
        display:flex;
        flex-direction: column-reverse;
    }
    .contentbot{
        display: flex;
        justify-content: space-around;
        margin-bottom:1rem;
        margin-top:0.5rem;
    }
    .right {
        width:70%;
        color:white;
        display: flex;
        flex-direction: column-reverse;
    }
    .left {
        width:30%;
        display: flex;
        justify-content: center;
        z-index: 99;
    }
    .authorprofile {
        height: 100%;
    }
    .headline {
        width:88vw;
        background-color: steelblue;
        height: 56vw;
        border-radius: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
    }
    .header{
        position: absolute;
        height: 100%;
    }
    .detail {
        width:70%;
        margin-bottom:0.8rem;
        color: white;
        font-family: var(--fontfamily2);
        z-index: 10;
    }
    .title {
        font-size: 1.25rem;
        line-height: 1.2rem;
        font-weight: 700;
        padding-right:1rem;
    }
    .author {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        z-index: 20;
    }
    .excerpt {
        font-size: 0.8rem;
    }
    .profile {
        position: relative;
        top:-10vw;
        width:15vw;
        height:15vw;
        border-radius: 50%;
        overflow: hidden;
    }
</style>