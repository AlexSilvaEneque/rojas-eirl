import prisma from ".";
import { CreateCategory, Category } from "../interfaces/category";

export const getAllCategories = () : Promise<Category[]> => {
    return prisma.category.findMany()
}

export const getAllCategoryById = (id : string) : Promise<Category | null> => {
    return prisma.category.findUnique({
        where: {
            id
        }
    })
}

export const getCategoriesEnable = () => {
    return prisma.category.findMany({
        where: {
            status: true
        },
        select: {
            id: true,
            name: true
        }
    })
}

export const getCategoryByName = (name: string) : Promise<Category | null> => {
    return prisma.category.findUnique({
        where: {
            name
        }
    })
}

export const registerCategory = (formData : CreateCategory) => {
    return prisma.category.create({
        data: {
            name: formData.name
        }
    })
}

export const updateCategory = (category : Category) => {
    return prisma.category.update({
        where: {
            id: category.id
        },
        data: {
            name: category.name
        }
    })
}

export const deleteCategory = (category : Category) => {
    return prisma.category.update({
        where: {
            id: category.id
        },
        data: {
            status: false
        }
    })
}

export const enableCategory = (category : Category) => {
    return prisma.category.update({
        where: {
            id: category.id
        },
        data: {
            status: true
        }
    })
}