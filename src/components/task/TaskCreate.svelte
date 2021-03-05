<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import Requirement from '../../models/Requirement'
    import Task from  '../../models/Task'
    import User from  '../../models/User'

    const url = "https://localhost:5001/api/Projects";
    const getUserUrl = "https://localhost:5001/api/Users";

    let projects = [];
    let users = [];
    let task = new Task();

    //GET tous les projects
    axios.get(url)
    .then(res =>  {
        let requirements = [];
        for(let project of res.data) {
            for (let requirement of project.requirements) {
                requirements = [...requirements, Object.assign(new Requirement, requirement)]
            }
            project.requirements = requirements;
            projects = [...projects, Object.assign(new Project, project)]
        }
    })
    .catch(err=>{
        console.log(err);
    });

    axios.get(getUserUrl)
    .then(res => {
        for (let user of res.data){
            users = [...users, Object.assign(new User, user)]
        }
        console.log(users);
    })
    .catch(err => {
        console.log(err)
    });

    let isFunctionnel = false;

    function isFunctionnelChecked() {
        isFunctionnel = !isFunctionnel;
    }

    function createTask(){
        let url = "https://localhost:5001/api/Tasks";
        axios.post(url, {
            "description": task.description,
            "label": task.label,
            "project": task.project,
            "userId": task.userId,
            "theoricDateStart": (new Date(task.theoricDateStart)).toISOString(),
            "nbDay": task.nbDay
        })
        .then(res => {
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })

    }
</script>
<style>
    input,select {
        border: 1px solid #000;
        padding: 5px;
    }
</style>

{#if projects.length > 0 && users.length > 0}
    <div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div class="py-12">
            <h2 class="text-2xl font-bold">Créer une tâche</h2>
            <div class="mt-8 max-w-md">
                <div class="grid grid-cols-1 gap-6">
                    <label class="block">
                        <span class="text-gray-700">Label</span>
                        <input bind:value={task.label} type="text" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Description</span>
                        <input bind:value={task.description} type="text" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Projet</span>
                        <select bind:value={task.project} class="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            {#each projects as project}
                                <option value={project.id}>{project.name}</option>
                            {/each}
                        </select>
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Utilisateur</span>
                        <select bind:value={task.userId} class="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            {#each users as user}
                                <option value={user.id}>{user.getFullName()}</option>
                            {/each}
                        </select>
                    </label>
                    <label class="block">
                        <span class="text-gray-700">Date theorique de début</span>
                        <input bind:value={task.theoricDateStart} type="date" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Charge</span>
                        <input bind:value={task.nbDay} type="text" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                    </label>

                    <label class="block">
                        <button on:click={createTask}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer</button>
                    </label>
                </div>
            </div>
        </div>
    </div>
{/if}
