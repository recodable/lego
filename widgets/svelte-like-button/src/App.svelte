<script>
  import 'whatwg-fetch';
  import debounce from 'lodash.debounce';
  import { spring, tweened } from 'svelte/motion';
  import { scale } from 'svelte/transition';
  import { onMount, tick } from 'svelte';
  import Like from './Like.svg.svelte';
  import ky from 'ky';
  import Counter from './Counter.svelte';

  const initSize = 48;
  let isLiked = null;
  let count = null;
  let isReady = false;

  $: containerSize = spring(initSize, {
    stiffness: 0.25,
    damping: 0.6,
  });

  $: containerStyle = `width: ${$containerSize}px; height: ${$containerSize}px;`;

  const toggle = () => {
    isLiked = !isLiked;
    if (isLiked) {
      count += 1;
    } else {
      count -= 1;
    }
    update();
  };

  const update = debounce(async () => {
    const method = isLiked ? 'post' : 'delete';
    await ky[method](
      `http://localhost:3000/?key=${window.location.href}`,
    ).json();
  }, 500);

  onMount(async () => {
    const data = await ky
      .get(`http://localhost:3000/?key=${window.location.href}`)
      .json();

    isLiked = data.alreadyLiked;
    count = data.count;
    await tick();
    isReady = true;
  });
</script>

{#if isReady}
  <div class="container" in:scale={{ duration: 50 }}>
    <div
      class="button"
      on:click={() => toggle()}
      on:mouseover={() => containerSize.set(initSize + 8)}
      on:mouseout={() => containerSize.set(initSize)}
      on:mousedown={() => containerSize.set(initSize - 8)}
      on:mouseup={() => containerSize.set(initSize)}
      style={containerStyle}
    >
      {#if isLiked}
        <Like filled={true} />
      {:else}
        <Like filled={false} />
      {/if}
    </div>

    <Counter {count} />
  </div>
{/if}

<style>
  .container {
    user-select: none;
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .button {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999999999px;
    border: 1px solid;
    --tw-border-opacity: 1;
    border-color: rgba(209, 213, 219, var(--tw-border-opacity));
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    z-index: 10;
  }
</style>
