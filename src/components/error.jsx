export default function Error ({error}){
    if (error=== 404){
        return (
            <div>
                <p> 404 error.page not found</p>

            </div>
        )
    }
    if(error === 0){
        return (
            <div>
                <p> not content has been found</p>

            </div>
        )
    }
    if(error === 400){
        return (
            <div>
                <p> 400 error.bad request</p>

            </div>
        )
    }
}