export default function Logout({ setAuth }) {

    async function logout() {
        window.localStorage.removeItem('token');
        setAuth({});
    }
    return (
        <div>
            <input
                type="button"
                value="Logout"
                onClick={logout} />
        </div>
    )
}