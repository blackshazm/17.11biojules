export declare class User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    passwordHash: string;
    referrerId?: string;
    commissionRate: number;
    accountStatus: 'active' | 'pending' | 'blocked';
    constructor(props: {
        id: string;
        name: string;
        email: string;
        cpf: string;
        passwordHash: string;
        referrerId?: string;
        commissionRate?: number;
        accountStatus?: 'active' | 'pending' | 'blocked';
    });
    private formatCpf;
    static validateCpf(cpf: string): boolean;
}
