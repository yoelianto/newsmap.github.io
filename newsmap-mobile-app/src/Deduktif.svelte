<script>
</script>


<div class="container" id="deduktif">
    <div class="bottom">
        <div class="content">
            <div class="contentbot">
                <div class="left">
                    <div class="profile">
                        <img class="authorprofile" src="https://via.placeholder.com/600/24f355" alt="author profile">
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
                    <div class="detail">
                        <div class="author">oleh Ahsan Ridhoi</div>
                        <div class="title">Lorem Ipsum Dolor Sit Amet</div>   
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
    }
    .authorprofile {
        width:15vw;
        height:15vw;
        border-radius: 50%;
    }
    .headline {
        width:88vw;
        background-color: steelblue;
        height: 56vw;
        border-radius: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .detail {
        width:70%;
        margin-bottom:0.8rem;
        color: white;
        font-family: var(--fontfamily2);
    }
    .title {
        font-size: 1.25rem;
        line-height: 1.2rem;
        font-weight: 700;
    }
    .author {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
    .excerpt {
        font-size: 0.8rem;
    }
    .profile {
        position: relative;
        top:-10vw;
    }
</style>