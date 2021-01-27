<script>
  import { scale } from 'svelte/transition';

  export let filled;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill={filled ? 'currentColor' : 'none'}
  viewBox="0 0 24 24"
  stroke="currentColor"
  in:scale={{ duration: 150 }}>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  />
</svg>

<style>
  svg {
    width: 50%;
    height: 50%;
    color: rgba(239, 68, 68, 1);
  }
</style>
