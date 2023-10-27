<template>
    <div class="w-96 bg-green-400 py-3 px-2 text-center rounded absolute right-10 bottom-5 text-gray-600">
        <div class="flex w-full items-center gap-4">
            <UIcon name="i-heroicons-check-circle" class="text-xl" />
            <h3>
                <slot />
            </h3>
        </div>
    </div>
</template>