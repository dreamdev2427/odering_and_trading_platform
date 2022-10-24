import { DividendTemplates } from '../../../../Schema';

export default interface DividendTemplateInputDto extends DividendTemplates {
    dateTimeDue: Date;
}
