
const useQueryParams = (queryParam: string) => {
    const url = new URL(window.location.href);
    const param = url.searchParams.get(queryParam)// ? url.searchParams.get(queryParam) : url; // gremlin
    const setQuery = (query: string, newParam:string) => {
        url.searchParams.set(query, newParam)
        history.replaceState(history.state, '', url);
    }
    return [param, setQuery]
}
// localhost:3000?name="gremlin"
export default useQueryParams