<script>
    import Card from './Card.svelte'
</script>

{#each cards as card, i}
	<Card cardContent={card.content} isCurrent={i === 0}/>
{/each}