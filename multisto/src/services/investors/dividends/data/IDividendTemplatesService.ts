import { DividendTemplates } from '../../../../Schema';

export default interface IDividendTemplatesService {
    create(template: Omit<DividendTemplates, "id">): Promise<number>;
    list(stoId: number): Promise<DividendTemplates[]>;
    update(template: DividendTemplates): Promise<void>;
    delete(template: Partial<DividendTemplates>): Promise<void>;
    /** Update the isActive property on the template, return success */
    updateIsActive(templateId: number, isActive: number): Promise<boolean>;
}
