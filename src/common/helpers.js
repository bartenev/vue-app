export const normalizePost = post => {
    return {
        userId: post.userId,
        id: post.id,
        title: post.title,
        description: post.body,
    };
};
