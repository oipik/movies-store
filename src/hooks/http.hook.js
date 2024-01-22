export const useHttp = () => {

    const request = async (url) => {

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Couldn't catch ${url}, status: ${response.status}`)
            }

            const data = await response.json();
            
            return data;
        } catch (err) {
            throw err;
        }
    };

    return { request };
}