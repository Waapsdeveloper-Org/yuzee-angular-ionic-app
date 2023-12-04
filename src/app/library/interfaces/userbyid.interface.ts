export interface UserByIdInterface {
    id?: string;
    aboutMe?: any;
    address?: any;
    citizenship?: any;
    city?: any;
    countryOrgin?: any;
    dob?: any;
    dobStr?: any;
    enabled?: boolean;
    imageName?: any;
    imageURL?: any;
    middleName?: any;
    postalCode?: any;
    roles?: any;
    state?: any;
    userEduInfo?: any;
    whattsappNo?: any;
    is_owner: boolean;
    is_temp_password?: boolean;
    skills?: any[];
    listOfUserEnglishQualificationProfileResponseDto?: any[];
    userAchivementsProfileResponseDto: {
        achivement_name?: any,
        location?: any;
    };
    userEducationProfileResponseDto: {
        education_title?: any,
        cgpa?: any;
    };
    currencyCode?: string;
    skypeId?: string;
    socialAccountId?: string;
    email?: string;
    firstName?: string;
    gender?: string;
    lastName?: string;
    mobileNo?: string;
    signUpType?: string;
    userType?: string;
    username?: string;
    profile_image?: {
        base_url?: string;
        entity_id?: string;
        entity_sub_type?: string;
        entity_type?: string;
        file_type?: string;
        file_url?: string;
        original_file_name?: string;
        stored_file_name?: string;
        thumbnails?: {
            height?: number;
            url?: string,
            width?: number;
        }[];
    };
}
