<script lang="ts">
import Content from './lib/Content.svelte';

  import Footer from './lib/Footer.svelte';
  import Header from './lib/Header.svelte'
</script>

<main>
  <Header />
  <Content />
  <Footer />
</main>

<style>
  :root {
    font-family: 'Red Hat Mono', monospace;
  }

  main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
  }
</style>
