<script>
    import axios from "axios";
    export let requirements;

    let isModalDeleteProjectShown = false;
    let selectedRequirement = {};

    function showModalDelete(requirement){
        isModalDeleteProjectShown = true;
        selectedRequirement = requirement;
    }

    function deleteExigence() {
        axios.delete("https://localhost:5001/api/Requirements/"+selectedRequirement.id)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        })
    }

    function hideModal() {
        isModalDeleteProjectShown = false;
    }

</script>
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" style="margin-top: -80px ">
    <div class="p-8 rounded shadow-xl sm:p-16 border border-indigo-600">
        <div class="flex flex-col lg:flex-row">
            <div class="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
                <h2 class="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    Exigence
                </h2>
            </div>
            <div class="lg:w-1/2" style="display: flex;justify-content: flex-end;">
                <a href="/#/requirement/create" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Créer une exigence</a>
            </div>
        </div>
        <div class="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {#each requirements as requirement, i}
                    <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                        <div class="p-5">
                            <p class="mb-2 font-bold">Exigence {i+1}</p>
                            <p class="text-sm leading-5 text-gray-900">
                               Description : {requirement.description}
                            </p>
                            <p class="text-sm leading-5 text-gray-900">
                                Fonctionnel : {requirement.isFunctional ? "oui" : "non"}
                            </p>
                            {#if !requirement.isFunctional}
                                <p class="text-sm leading-5 text-gray-900">
                                    Type d'exigence : {requirement.requirementNoneFunctional}
                                </p>
                            {/if}
                            <br>
                            <a href="/#/requirement/{requirement.id}" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-eye"></i></a>
                            <a on:click={_=>showModalDelete(requirement)} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-trash-alt"></i></a>
                            <a href="/#/requirement/{requirement.id}/edit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-pen"></i></a>
                        </div>
                        <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="fixed {isModalDeleteProjectShown ? '' : 'hidden'} z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!--
          Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <!-- Heroicon name: outline/exclamation -->
                        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Etes-vous sûr ?
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Vous êtes sur le point de supprimer l'exigence ?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button on:click={deleteExigence} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Supprimer
                </button>
                <button on:click={hideModal} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</div>