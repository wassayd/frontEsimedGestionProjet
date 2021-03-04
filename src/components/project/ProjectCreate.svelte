<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import User from "../../models/User"

    export let params;

    const baseUrl = "https://localhost:5001/api/";

    let users = [];
    axios.get(baseUrl+"Users")
    .then(res=> {
        for(let user of res.data) {
            users.push(Object.assign(new User, user))
        }
        users = users;
    });

    function createProject() {
        axios.post(baseUrl+"Projects", {
            name: document.querySelector("#projectName").value,
            userId: document.querySelector("#userSelected").value
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
    }
</script>
<style>
    input,select {
        border: 1px solid #000;
        padding: 5px;
    }
</style>
<div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
    <div class="py-12">
        <h2 class="text-2xl font-bold">Créer un projet</h2>
        <div class="mt-8 max-w-md">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">Nom du projet</span>
                    <input id="projectName"  type="text" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                </label>
                <label class="block">
                    <span class="text-gray-700 ">Chef de projet</span>
                    <select id="userSelected" class="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        {#each users as user}
                            <option value={user.id}>{user.getFullName()}</option>
                        {/each}
                    </select>
                </label>
                <label class="block">
                    <button on:click={createProject} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer</button>
                </label>
            </div>
        </div>
    </div>
</div>