export interface RepliesInterface {
    editMode?: boolean;
    added_date?: string;
    comment_id?: string;
    comment_text?: string;
    number_of_like?: number;
    number_of_replies?: number;
    reaction_id?: string;
    commenter_image_url?: string;
    commenter_user_name?: string;
    user_id?: string;
}

export interface CommentsInterface {
    editMode?: boolean;
    replyMode?: boolean;
    added_date?: string;
    comment_id?: string;
    comment_text?: string;
    number_of_like?: number;
    number_of_replies?: number;
    reaction_id?: string;
    commenter_image_url?: string;
    commenter_user_name?: string;
    user_id?: string;
    replies?: RepliesInterface[];
}

export interface PostFeedsInterface {
    is_owner?: boolean;
    isFavorite?: boolean;
    hasOnlyGif?: boolean;
    gifs?: string[];
    self_like_reaction_id?: string;
    activity_id?: string;
    added_date?: string;
    desciption?: string;
    entity_id?: string;
    entity_image?: string;
    entity_name?: string;
    entity_type?: string;
    has_liked: false
    hash_tags?: string[];
    mentioned_user_id?: string[];
    number_of_comment?: number;
    number_of_like?: number;
    post_id?: string;
    storage: {
        base_url?: string;
        entity_id?: string;
        entity_sub_type?: string;
        entity_type?: string;
        file_type?: string;
        file_url?: string;
        original_file_name?: string;
        ext?: string;
        isImage?: boolean;
        isVideo?: boolean;
        stored_file_name?: string;
        thumbnails: {
            height?: number;
            width?: number;
            url?: string;
        }[];
    }[];
    chunkedStorage: {
        base_url?: string;
        entity_id?: string;
        entity_sub_type?: string;
        entity_type?: string;
        file_type?: string;
        file_url?: string;
        original_file_name?: string;
        ext?: string;
        isImage?: boolean;
        isVideo?: boolean;
        stored_file_name?: string;
        thumbnails: {
            height?: number;
            width?: number;
            url?: string;
        }[];
    }[];
    comments?: CommentsInterface[];
    type?: string;
}
