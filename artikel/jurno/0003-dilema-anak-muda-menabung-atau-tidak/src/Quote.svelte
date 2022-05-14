<script>
    export let imgurl, imgalt, quotes, person, credential;
</script>

<section>
    <figure>
        <div class="quote-pic">
            <div class="pic-bg"></div>
            <img class="quote-img" src={ imgurl } alt={ imgalt }>
        </div>
        
        <div class="quotes-right">
            <div class="quotes-tri"></div>
            <div class="quotes">
                <p>{ quotes }</p>
            </div>
            <div class="quote-name">
                <span class="quotes-bold">{ person }</span>, { credential }
            </div>
        </div>
    </figure>
</section>

<style>
section {
    width:90%;
    max-width: 650px;
    margin: 0 auto 0 auto;
    text-align: left;
    box-sizing: content-box;
    margin-top: 3rem;
    margin-bottom: 3rem;

}

figure {
    margin:0;
    display: flex;
}

.quote-pic {
    min-width:120px;
    height:120px;
    /*background-color: lightcoral;*/
    border-radius: 50%;
    position: relative;
}

.quote-img {
    max-width: 120px;
    width:100%;
    height:100%;
    object-fit: contain;
}

.pic-bg {
    width:90%;
    height:90%;
    left:5%;
    top:5%;
    background-color: #f5da9f;
    border-radius: 50%;
    position:absolute;
    z-index:-1;
}

.quotes-right {
    max-width:500px;    
    display: flex;
    flex-direction: column;
    /*background-color: lightpink;*/
    margin-left: 1.5rem;
    position: relative;
}

.quotes-tri {
    width:0;
    height:0;
    position:absolute;
    border-right: 0.7rem solid #8cb5ab;
    border-top: 0.7rem solid #8cb5ab;
    border-left: 0.7rem solid transparent;
    border-bottom: 0.7rem solid transparent;
    left:-1.2rem;
    top: 1rem;
}

.quotes {
    padding: 1rem;
    background-color: #8cb5ab;
    border-radius: 0.75rem;
}

.quotes p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
}

.quotes-bold {
    font-weight: 600;
}

.quote-name {
    padding: 0.5rem;
    /*background-color: lightsteelblue;*/
    padding-left: 1rem;
}
@media screen and (max-width: 689px) {

    .quote-pic {
        min-width:90px;
        height:90px;
    }
    .quote-img {
        max-width: 90px;
        width:100%;
        object-fit: contain;
    }

}

</style>