import { useSelector } from "react-redux";


const FormList = () => {

    const forms = useSelector(state => state.forms)



    return(
        <div>
            <h2>FormList</h2>
            <button>New Form</button>
            {forms && (
                <ul>
                    {forms.map((form) => (
                        <li key={form.id} >{form.name}</li>
                    ))}
                    
                </ul>
            
            )}


        </div>
    )
};

export default FormList;