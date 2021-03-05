<script>
    import axios from "axios"
    import Project from "../../models/Project"
    import Requirement from '../../models/Requirement'

    const url = "https://localhost:5001/api/Projects";

    let projects = [];
    let requirements = [];

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

</script>
<h1>Show</h1>