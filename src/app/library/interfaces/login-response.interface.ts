export interface LoginResposeInterface {
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    session_state?: string;
    token_type?: string;
    id_token?: string;
    expires_in?: number;
    'not-before-policy'?: number;
    refresh_expires_in?: number;
}
