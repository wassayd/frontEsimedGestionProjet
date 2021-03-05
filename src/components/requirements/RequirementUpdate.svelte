<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import Requirement from '../../models/Requirement'

    export let params;


    const url = "https://localhost:5001/api/Requirements/"+params.guid;

    let requirement = {};

    axios.get(url)
    .then(res =>  {
        requirement = Object.assign(new Requirement, res.data);
        console.log(requirement);
    });

    let isFunctionnel = false;

    function isFunctionnelChecked() {
        isFunctionnel = !isFunctionnel;
    }

    function updateRequirement(){
        axios.put(url, {
            "description": requirement.description,
            "isFunctional": requirement.isFunctional,
            "requirementNoneFunctional": !requirement.isFunctional ? requirement.requirementNoneFunctional : "",
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
<div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
    <div class="py-12">
        <h2 class="text-2xl font-bold">Modifier l'exigence</h2>
        <div class="mt-8 max-w-md">
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <span class="text-gray-700">Description</span>
                    <input bind:value={requirement.description} type="text" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="">
                </label>
                <div class="block">
                    <label class="inline-flex items-center mt-3">
                        <span class="mr-5 text-gray-700">Exigence fonctionnel ?</span>
                        <input on:click={isFunctionnelChecked} bind:checked={requirement.isFunctional} type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600">
                    </label>
                </div>
                {#if !requirement.isFunctional }
                    <label class="block">
                        <span class="text-gray-700 ">Type d'exigence</span>
                        <select bind:value={requirement.requirementNoneFunctional} class="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="données">Données</option>
                            <option value="performances">Performances</option>
                            <option value="interfaces utilisateur">Interfaces utilisateur</option>
                            <option value="qualité">qualité</option>
                            <option value="services">services</option>
                        </select>
                    </label>
                {/if}
                <label class="block">
                    <button on:click={updateRequirement}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button>
                </label>
            </div>
        </div>
    </div>
</div>