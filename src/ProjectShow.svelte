<script>
    import axios from "axios"
    import Project from "./models/Project"

    export let params;

    const url = "https://localhost:5001/api/Projects/"+params.guid;

    let project = {};

    axios.get(url)
    .then(res =>  {
        project = Object.assign(new Project, res.data);
        console.log(project)
    }); 

</script>
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div class="p-8 rounded shadow-xl sm:p-16">
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
                <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-trash-alt"></i></a>
                <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-pen"></i></a>
            </div>
        </div>
    </div>
</div>