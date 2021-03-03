<script>
	import Router from 'svelte-spa-router';
	import Header from "./Header.svelte";
	import Project from "./Projects.svelte";
	import Task from "./Tasks.svelte";
	import NotFound from "./NotFound.svelte"
	import Footer from "./Footer.svelte"
	import ProjectShow from './ProjectShow.svelte'


	const routes = {
		'/projects': Project,

		'/project/:guid': ProjectShow,

		'/tasks': Task,

		'*': NotFound
	}

</script>

<Header/>
<div id="PageContent">
	<Router {routes}/>
</div>
<Footer/>

<style>

#PageContent{
	min-height: 54vh;
}
</style>