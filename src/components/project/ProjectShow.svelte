<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import Requirements from "../requirements/Requirements.svelte"
    import Requirement from '../../models/Requirement'
    import Tasks from '../task/Tasks.svelte'

    export let params;

    const url = "https://localhost:5001/api/Projects/"+params.guid;

    let project = {};
    let requirements = [];

    axios.get(url)
    .then(res =>  {
        project = Object.assign(new Project, res.data);
        for (let requirement of project.requirements) {
            requirements = [...requirements, Object.assign(new Requirement, requirement)]
        }
        project.requirements = requirements;
        project.startDate = (new Date(project.startDate)).toLocaleDateString("fr-FR");
    }); 

</script>
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div class="p-8 rounded shadow-xl sm:p-16 border border-indigo-600">
        <div class="flex flex-col lg:flex-row">
            <div class="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
                <h2 class="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    {project.name}
                </h2>
            </div>
            <div class="lg:w-1/2">
                <p class="mb-4 text-base text-gray-700">
                  Chef de projet : {project?.user?.firstName} {project?.user?.lastName}
                </p>
                <p class="mb-4 text-base text-gray-700">
                    Date de debut : {project.startDate}
                </p>
                <p class="mb-4 text-base text-gray-700">
                    Chef de projet : {project?.user?.firstName} {project?.user?.lastName}
                </p>
            </div>
        </div>
        <div class="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div class="grid grid-cols-2 row-gap-8 md:grid-cols-3">
                <div class="text-center">
                    <h6 class="text-3xl font-bold text-deep-purple-accent-400">{project?.requirements?.length}</h6>
                    <p class="font-bold">Exigence</p>
                </div>
                <div class="text-center">
                    <h6 class="text-3xl font-bold text-deep-purple-accent-400">0</h6>
                    <p class="font-bold">Jalon</p>
                </div>
                <div class="text-center">
                    <h6 class="text-3xl font-bold text-deep-purple-accent-400">0</h6>
                    <p class="font-bold">Tache</p>
                </div>
            </div>
        </div>
    </div>
</div>

{#if project.requirements != null}
    <Requirements requirements={project.requirements}/>
{/if}

{#if project.tasks != null}
    <Tasks tasks={project.tasks}/>
{/if}