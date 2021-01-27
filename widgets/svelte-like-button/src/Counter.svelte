<script>
  import { tweened } from 'svelte/motion';
  import debounce from 'lodash.debounce';

  export let count;

  $: counterStyle = tweened({ bottom: 20, opacity: 0 }, { duration: 75 });

  const hideCount = (options = {}) => {
    counterStyle.set({ bottom: 20, opacity: 0 }, options);
  };

  const debouncedHideCount = debounce(hideCount, 1000);

  const showCount = () => {
    hideCount({ duration: 0 });
    counterStyle.set({ bottom: 60, opacity: 1 });
    debouncedHideCount();
  };

  $: count, showCount();

  const format = (count) => {
    if (count >= 1000000) {
      return `${Math.round((count / 1000000) * 10) / 10}M`;
    }

    if (count >= 1000) {
      return `${Math.round((count / 1000) * 10) / 10}k`;
    }

    return count;
  };

  $: displayCount = format(count);
</script>

<span
  style={`bottom: ${$counterStyle.bottom}px; opacity: ${$counterStyle.opacity}`}
  >{displayCount}</span
>

<style>
  span {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    position: absolute;
    color: #fff;
    background-color: rgba(239, 68, 68, 1);
    font-weight: 400;
    padding: 0.25rem 0.75rem;
    border-radius: 999999999px;
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
