<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import Requirement from "../../models/Requirement"

    const url = "https://localhost:5001/api/Projects";
    
    let projects = [];
    let requirements = [];
    let isModalDeleteProjectShown = false;
    let selectedProject = {};

    axios.get(url)
    .then(res =>  {
        for(let project of res.data) {
            for (let requirement of project.requirements) {
                requirements = [...requirements, Object.assign(new Requirement, requirement)]
            }
            project.requirements = requirements;
            projects = [...projects, Object.assign(new Project, project)]
        }
    });

    function showModalDelete(p) {
        isModalDeleteProjectShown = true;
        selectedProject = p;
    }

    function deleteProject() {
        let urlDelete = url+"/"+selectedProject.id;
        axios.delete(urlDelete)
        .then(res => {
            console.log(res);
            isModalDeleteProjectShown = false;
            window.location.reload();
        })
        .catch(err => {
            console.error(err);
            isModalDeleteProjectShown = false
        })

    }

    function hideModal() {
        isModalDeleteProjectShown = false
    }
</script>
<div class="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div class="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
      <svg viewBox="0 0 88 88" class="w-full max-w-screen-xl text-indigo-100">
        <circle fill="currentColor" cx="44" cy="44" r="15.5"></circle>
        <circle fill-opacity="0.2" fill="currentColor" cx="44" cy="44" r="44"></circle>
        <circle fill-opacity="0.2" fill="currentColor" cx="44" cy="44" r="37.5"></circle>
        <circle fill-opacity="0.3" fill="currentColor" cx="44" cy="44" r="29.5"></circle>
        <circle fill-opacity="0.3" fill="currentColor" cx="44" cy="44" r="22.5"></circle>
      </svg>
    </div>
    <div class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {#each projects as project}
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                    <div class="p-5">
                        <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                            <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                            <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                            </svg>
                        </div>
                        <p class="mb-2 font-bold">{project.name}</p>
                        <p class="text-sm leading-5 text-gray-900">
                            Chef de projet : {project.user.firstName} {project.user.lastName}
                        </p>
                        <p class="text-sm leading-5 text-gray-900">
                            Nombre de taches : {project.tasks.length}
                        </p>
                        <p class="text-sm leading-5 text-gray-900">
                            Nombre de jalons : {project.milestones}
                        </p>
                        <p class="text-sm leading-5 text-gray-900">
                            Progression : 0%
                        </p>
                        <br>
                        <a href="/#/project/{project.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-eye"></i></a>
                        <a  on:click={()=>showModalDelete(project)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-trash-alt"></i></a>
                        <a href="/#/project/{project.id}/edit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-pen"></i></a>

                    </div>
                    <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
                </div>
        {/each}
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
                                Vous êtes sur le point de supprimer le projet <b>{selectedProject.name} !</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button on:click={deleteProject} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Supprimer
                </button>
                <button on:click={hideModal} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</div>
