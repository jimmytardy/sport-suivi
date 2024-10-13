import axiosClient from "../axiosClient"



interface IHttpCrud<T> {
    find: (id: string) => Promise<T>
    findAll: () => Promise<T[]>
    create: (data: Partial<T>) => Promise<void>
    update: (id: string, data: Partial<T>) => Promise<void>
    remove: (id: string) => Promise<void>
}


export const useHttpCrud = <T,>(api: string) : IHttpCrud<T> => {
    return {
        find: (id: string) => axiosClient.get(`${api}/${id}`).then(response => response.data),
        findAll: () => axiosClient.get(`${api}`).then(response => response.data),
        create: (data: Partial<T>) => axiosClient.post(`${api}`, data).then(response => response.data),
        update: (id: string, data: Partial<T>) => axiosClient.put(`${api}/${id}`, data).then(response => response.data),
        remove: (id: string) => axiosClient.delete(`${api}/${id}`),
    } as IHttpCrud<T>
}