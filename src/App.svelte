<script>
	import Router from 'svelte-spa-router';
	import Header from "./Header.svelte";
	import Project from "./components/project/Projects.svelte";
	import Task from "./components/task/Tasks.svelte";
	import NotFound from "./NotFound.svelte"
	import Footer from "./Footer.svelte"
	import ProjectShow from './components/project/ProjectShow.svelte'
	import ProjectEdit from './components/project/ProjectEdit.svelte'
	import ProjectCreate from './components/project/ProjectCreate.svelte'
	import RequirementCreate from './components/requirements/RequirementCreate.svelte'
	import RequirementShow from './components/requirements/RequirementShow.svelte'
	import RequirementUpdate from './components/requirements/RequirementUpdate.svelte'
	import TaskCreate from './components/task/TaskCreate.svelte'
	import TaskUpdate from './components/task/TaskUpdate.svelte'

	const routes = {
		'/projects': Project,

		'/': Project,

		'/project/create': ProjectCreate,

		'/requirement/create' : RequirementCreate,

		'/requirement/:guid' : RequirementShow,

		'/requirement/:guid/edit' : RequirementUpdate,

		'/project/:guid': ProjectShow,

		'/project/:guid/edit': ProjectEdit,

		'/tasks': Task,

		'/task/create': TaskCreate,

		'/task/:guid/edit': TaskUpdate,

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