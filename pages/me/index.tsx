import {NextPage} from "next";
import {LOGOUT_PAGE} from "@Constants/routes";

const Index: NextPage = () => {
    return (
        <div>
            <h1>Bonjour</h1>
            <button>
                <a href={LOGOUT_PAGE}>
                    Logout
                </a>
            </button>
        </div>
    )
}

export default Index