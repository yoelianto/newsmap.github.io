<script>
    export let isCurrent;
    export let cardContent;
</script>

<p class="card" data-dragging="false" data-status="{isCurrent === true ? 'current' : 'waiting'}">
	<span class="card_content">{cardContent}</span>
</p>