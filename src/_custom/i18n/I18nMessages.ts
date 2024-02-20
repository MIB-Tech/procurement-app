import {en} from './messages/en';
import {ar} from './messages/ar';
import {fr} from './messages/fr';
import {CompoundFilterOperator, PropertyFilterOperator} from '../ListingView/Filter/Filter.types';
import {PriorityEnum, PurchaseNeedStatusEnum} from '../../app/modules/PurchaseNeed/Model';
import {ListingModeEnum} from '../ListingView/ListingView.types';
import {ViewEnum} from '../types/ModelMapping';
import {ClinicStatusEnum, QuantityStatusEnum} from '../../app/modules/PurchaseOrder/Model';


type Lang = 'en' | 'ar' | 'fr'
type I18nMessageKey =
  | PriorityEnum
  | PurchaseNeedStatusEnum
  | PropertyFilterOperator
  | CompoundFilterOperator
  | ListingModeEnum
  | ViewEnum
  | QuantityStatusEnum
  | ClinicStatusEnum
  | 'GENERATE_INVOICE'
  | 'VALIDATED'
  | 'SHOW'
  | 'VALIDATION.PURCHASE_ORDER_PRODUCT.QUANTITY'
  | 'VALIDATION.RECEIPT.RECEIPT_PRODUCTS'
  | 'GENERATE'
  | 'GENERATE_RECEIPT'
  | 'DELIVERY_STATUS'
  | 'MAD_BY_DEFAULT'
  | 'NOW_BY_DEFAULT'
  | 'TOTAL_INCL_TAX'
  | 'PERCENT'
  | 'AMOUNT'
  | 'CURRENCY'
  | 'PRICE_INCL_TAX'
  | 'RECEIVED_QUANTITY'
  | 'ADVANCED_FILTER'
  | 'PER_PAGE'
  | 'AUTH.LOGIN.TITLE'
  | 'AUTH.LOGIN.BUTTON'
  | 'EMAIL'
  | 'PASSWORD'
  | 'USERNAME'
  | 'FIRST_NAME'
  | 'LAST_NAME'
  | 'PLEASE_WAIT'
  | 'ORDERS'
  | 'PAGINATION.TITLE'

  | 'ID'
  | 'NAME'
  | 'DESCRIPTION'
  | 'BARCODE'
  | 'TYPES'
  | 'SORT_INDEX'
  | 'ORIGINAL_NAME'
  | 'CREATED_AT'
  | 'CREATED_BY'
  | 'TITLE'
  | 'LABEL'
  | 'EXTRA_FIELDS'
  | 'MATERIALIZED_PATH_TREE'
  | 'LOCALE'
  | 'VENDOR'
  | 'PHONE_NUMBERS'
  | 'UPDATED_AT'
  | 'QUANTITY'

  | 'FILTER'
  | 'LOADING'
  | 'ACTION'
  | 'ACTIONS'
  | 'ASSET_MODEL'
  | 'ASSET_MODELS'
  | 'ATTACHMENT'
  | 'ATTACHMENTS'
  | 'AVAILABLE_QUANTITY'
  | 'CATEGORIES'
  | 'CHILDREN'
  | 'COLOR_KEY'
  | 'CONTACTS'
  | 'CONTENT_URL'
  | 'DATA'
  | 'EXTRA_FIELD'
  | 'FIELD_TYPE'
  | 'FIELDS'
  | 'FILE'
  | 'FILEPATH'
  | 'ICON'
  | 'IMAGE'
  | 'IMAGES'
  | 'INTERVAL'
  | 'IS_MODULE'
  | 'CLINIC'
  | 'CLINICS'
  | 'LOGGED_AT'
  | 'MANUFACTURER'
  | 'MIN_QUANTITY'
  | 'MODEL'
  | 'NOTES'
  | 'OBJECT_CLASS'
  | 'OBJECT_ID'
  | 'PARENT'
  | 'READING_FREQUENCY'
  | 'READING_VALUE'
  | 'READINGS'
  | 'ROLE'
  | 'ROLES'
  | 'ROLE_KEY'
  | 'ROUTE_KEY'
  | 'ROUTES'
  | 'START_AT'
  | 'STATUS'
  | 'TEAM'
  | 'TEAMS'
  | 'TRANSLATABLE_LOCALE'
  | 'TREE_LEVEL'
  | 'TREE_PATH'
  | 'TREE_PATH_SOURCE'
  | 'USER'
  | 'VENDORS'
  | 'VERSION'
  | 'VIEW'
  | 'VIEWS'
  | 'WORK_ORDER'
  | 'WORK_ORDERS'
  | 'VALIDATION.MIXED.DEFAULT'
  | 'VALIDATION.MIXED.INVALID'
  | 'VALIDATION.MIXED.REQUIRED'
  | 'VALIDATION.MIXED.ONE_OF'
  | 'VALIDATION.MIXED.NO_ONE_OF'
  | 'VALIDATION.MIXED.NOT_TYPE'
  | 'VALIDATION.MIXED.DEFINED'
  | 'VALIDATION.MIXED.UNIQUE'
  | 'VALIDATION.NUMBER.MIN'
  | 'VALIDATION.NUMBER.MAX'
  | 'VALIDATION.NUMBER.LESS_THAN'
  | 'VALIDATION.NUMBER.MORE_THAN'
  | 'VALIDATION.NUMBER.POSITIVE'
  | 'VALIDATION.NUMBER.NEGATIVE'
  | 'VALIDATION.NUMBER.NOT_EQUAL'
  | 'VALIDATION.NUMBER.INTEGER'
  | 'VALIDATION.STRING.LENGTH'
  | 'VALIDATION.STRING.MIN'
  | 'VALIDATION.STRING.MAX'
  | 'VALIDATION.STRING.MATCHES'
  | 'VALIDATION.STRING.EMAIL'
  | 'VALIDATION.STRING.URL'
  | 'VALIDATION.STRING.UUID'
  | 'VALIDATION.STRING.TRIM'
  | 'VALIDATION.STRING.LOWERCASE'
  | 'VALIDATION.STRING.UPPERCASE'
  | 'VALIDATION.STRING.STARTS_WITH'
  | 'VALIDATION.STRING.PHONE_NUMBER'
  | 'VALIDATION.DATE.MIN'
  | 'VALIDATION.DATE.MAX'
  | 'VALIDATION.OBJECT.NO_UNKNOWN'
  | 'VALIDATION.ARRAY.MIN'
  | 'VALIDATION.ARRAY.MAX'
  | 'REQUESTED_AT'
  | 'WORK_ORDERS.DETAIL.STATUS'

  | 'MUTATION.DELETE.SUCCESS'
  | 'MUTATION.DELETE.ERROR'
  | 'MUTATION.CREATE.SUCCESS'
  | 'MUTATION.CREATE.ERROR'
  | 'MUTATION.UPDATE.SUCCESS'
  | 'MUTATION.UPDATE.ERROR'
  | 'MUTATION.UPLOAD.SUCCESS'
  | 'MUTATION.UPLOAD.ERROR'

  | 'APPLY'
  | 'CLOSE'
  | 'RESET'
  | 'CANCEL'
  | 'SAVE'
  | 'DELETE'
  | 'CONTROL.FILE.LABEL'
  | 'UNIT_PRICE'
  | 'TOTAL'
  | 'OVERDUE'
  | 'SERIAL_NUMBER'
  | 'PARENT_ASSET'
  | 'CHILD_ASSETS'
  | 'TEAMS_IN_CHARGE'
  | 'STOCK.EMPTY'
  | 'STOCK.LOW'
  | 'STOCK.AVAILABLE'
  | 'MORE.COUNT'
  | 'CONTACT.COUNT'
  | 'ASSET_MODEL.COUNT'
  | 'USERS'
  | 'AVATAR'
  | 'PASSWORD_CONFIRM'
  | 'VALIDATION.STRING.PASSWORD_CONFIRM'
  | 'MEMBERS'
  | 'ITEM.NOT.FOUND'
  | 'CHILD_LOCATIONS'
  | 'OPTION'
  | 'OPTIONS'
  | 'ENTER_OPTION'
  | 'ENTER_TEXT'
  | 'MAX'
  | 'MULTIPLE'
  | 'TIME_FORMAT'
  | 'DATE_FORMAT'
  | 'DURATION_FORMAT'
  | 'PRECISION'
  | 'SYMBOL'
  | 'FIELD'
  | 'CONFIRM'
  | 'CREATE'
  | 'UPDATE'
  | 'PREVIEW'
  | 'DELETE_CONFIRM.TITLE'
  | 'SORT'
  | 'SIGN_OUT'

  | 'CREATE_TIME'
  | 'LAST_MODIFIED_TIME'
  | 'NO_ITEM_FOUND'
  | 'FROM'
  | 'TO'
  | 'MIN'
  | 'ASSET'
  | 'ASSETS'
  | 'MODALITY_DESIGN'
  | 'START_DATE'
  | 'END_DATE'
  | 'END_AT'
  | 'INVENTORY_NUMBER'
  | 'CONTRACT_NUMBER'
  | 'INSTALLATION_TIME'
  | 'GUARANTEED_END_DATE'
  | 'PURCHASE_PRICE_EXCL_TAX'
  | 'CONTRACT'
  | 'ASSET_TYPE'
  | 'ASSET_TYPES'
  | 'INTERVENTION_TIME'
  | 'SUMMARY'
  | 'ACTIVITY'
  | 'CATEGORY'
  | 'SUBCATEGORY'
  | 'SUBCATEGORIES'
  | 'WORK_ORDER_ID'
  | 'SERVICE'
  | 'SERVICES'
  | 'UNDER_CONTRACT'
  | 'WITHOUT_CONTRACT'
  | 'MARK_AS'
  | 'CONTRACT_TYPE'
  | 'ABBREVIATION'
  | 'INTERVENTIONS'
  | 'WORK_DESCRIPTION'
  | 'DESIGNATION'
  | 'ARTICLE_CODE'
  | 'CONSUMED_PARTS'
  | 'PHONE_NUMBER'
  | 'ADD_CONTACT'
  | 'ADD_PART'
  | 'WORK_ORDER_MUST_BE_PENDING'
  | 'MARK_AS_COMPLETED'
  | 'SERVICE_TYPE'
  | 'UNDER_WARRANTY'
  | 'INTERVENTION'
  | 'NATURE'
  | 'EDIT_ACTION_HELPER'
  | 'OVERVIEW'
  | 'COMPANY_CALLED_AT'
  | 'DURATION'
  | 'IS_EXTERNAL'
  | 'DOWNTIME'
  | 'UPTIME'
  | 'REPAIR_DELAY'
  | 'INTERVENTION_DELAY'
  | 'USI'
  | 'WORK_ORDER_START_TIME'
  | 'PROGRESS_STARTED_AT'
  | 'PAR_YEAR'
  | 'PER_DURATION'
  | 'MAINTENANCE_TIME'
  | 'FILTER.TITLE'
  | 'TOO_GUESSABLE'
  | 'VERY_GUESSABLE'
  | 'SOMEWHAT_GUESSABLE'
  | 'SAFELY_UNGUESSABLE'
  | 'VERY_UNGUESSABLE'
  | 'TOO_GUESSABLE.DESCRIPTION'
  | 'VERY_GUESSABLE.DESCRIPTION'
  | 'SOMEWHAT_GUESSABLE.DESCRIPTION'
  | 'SAFELY_UNGUESSABLE.DESCRIPTION'
  | 'VERY_UNGUESSABLE.DESCRIPTION'
  | 'BACK'
  | 'SEARCH'
  | 'CONTEXTUAL_TITLE'
  | 'VENDOR_ADDRESS'
  | 'VENDOR_ADDRESSES'
  | 'DOWNLOAD'
  | 'ADD'
  | 'PRINT'
  | 'PART'
  | 'PARTS'
  | 'DIMENSIONS'
  | 'SIZE'
  | 'WHERE'
  | 'EDIT'
  | 'CLEAR'
  | 'ADD_CONDITION'
  | 'CODE'
  | 'DELETE_CONFIRM.DESCRIPTION'
  | 'ROUTE'
  | 'UPCOMING'
  | 'LOGS'
  | 'STATISTICS'
  | 'TIMELINE'
  | 'INTERVENTION_ATTACHMENT'
  | 'ERROR_PAGE.GO_HOME'
  | 'ERROR_PAGE.TITLE'
  | 'ERROR_PAGE.DESCRIPTION'
  | 'AUTHENTICATION_FAILURE'
  | 'EXCEPTION.HTTP_UNPROCESSABLE_ENTITY'
  | 'INVALID_DATA'
  | 'NO_IMAGE'
  | 'SERVICE_TYPE_KEY'
  | 'PREV_YEAR'
  | 'NEXT_YEAR'
  | 'TODAY'
  | 'MONTH'
  | 'WEEK'
  | 'DAY'
  | 'IS_BAD_MANIPULATION'
  | 'EVENT'
  | 'EVENTS'
  | 'IMPORT'
  | 'ORDER_NUMBER'
  | 'DESIRED_DELIVERY_DATE'
  | 'ORDERED_FOR'
  | 'BUYER_FULL_NAME'
  | 'IS_REGULARIZED'
  | 'PRIORITY'
  | 'RECEPTION_MANAGER'
  | 'PURCHASE_NEED'
  | 'PURCHASE_NEEDS'
  | 'PURCHASE_NEED_PRODUCT'
  | 'PURCHASE_NEED_PRODUCTS'
  | 'APPLICANT_SERVICE'
  | 'APPLICANT_SERVICES'
  | 'COMPANY'
  | 'COMPANIES'
  | 'PURCHASE_NEED_ATTACHMENT'
  | 'PURCHASE_NEED_ATTACHMENTS'
  | 'PRODUCT'
  | 'PRODUCTS'
  | 'PROJECT'
  | 'PROJECTS'
  | 'LINE'
  | 'LINES'
  | 'VALIDATION_PATH'
  | 'SIGN_IN'
  | 'STEP'
  | 'STEP_USER'
  | 'STRATEGY'
  | 'FILE_NAME'
  | 'PURCHASE_NEED_NUMBER'
  | 'RECOMENDED_VENDORS'
  | 'ORDER_TYPE'
  | 'VALIDATION_STARTED_AT'
  | 'COMMENT'
  | 'REFERENCE'
  | 'NOTE'
  | 'MEASUREMENT_UNIT'
  | 'ACCOUNTING_ACCOUNT'
  | 'VAT_RATE'
  | 'MOBILISED'
  | 'STOCKABLE'
  | 'APPLICATED_AT'
  | 'BID_PRICE_INCL_TAX'
  | 'DISCOUNT_VALUE'
  | 'PURCHASE_PRICE_INCL_TAX'
  | 'ICE'
  | 'RECEIVE_AT'
  | 'DEVIS_DATE'
  | 'IS_VAT_INCLUDED'
  | 'DEVISE_NUMBER'
  | 'ORDERED_QUANTITY'
  | 'VALIDATED_QUANTITY'
  | 'PART_NUMBER'
  | 'DEVIS_NUMBER'
  | 'RECOMMENDED_PRICE'
  | 'VENDOR_PRODUCT_CODE'
  | 'DESINATION'
  | 'IS_CONFORME'
  | 'SCORE'
  | 'POSTAL_CODE'
  | 'ADDRESS'
  | 'CITY_NAME'
  | 'IS_MAIN'
  | 'GROSS_PRICE'
  | 'NET_PRICE'
  | 'GROSS_TOTAL_EXCL_TAX'
  | 'NET_TOTAL_EXCL_TAX'
  | 'VAT_TAX'
  | 'DISCOUNT_TYPE'
  | 'REF'
  | 'EXTERNAL_REF'
  | 'TOTAL_VAT_TAX'
  | 'STEP_USERS'
  | 'STEPS'
  | 'PURCHASE_FILE_TYPES'
  | 'PURCHASE_FILE_TYPE'
  | 'PURCHASE_FILES'
  | 'VENDOR_OFFERS'
  | 'PURCHASE_FILE_PRODUCTS'
  | 'PURCHASE_FILE_PRODUCT'
  | 'VENDOR_OFFER_PRODUCT'
  | 'VENDOR_OFFER_PRODUCTS'
  | 'PURCHASE_ORDER'
  | 'PURCHASE_ORDERS'
  | 'PURCHASE_ORDER_CATEGORIES'
  | 'RECEIPT'
  | 'RECEIPTS'
  | 'RECEIPT_PRODUCT'
  | 'RECEIPT_PRODUCTS'
  | 'DESIRED_PRODUCT'
  | 'DESIRED_PRODUCTS'
  | 'PURCHASE_ORDER_PRODUCT'
  | 'PURCHASE_ORDER_PRODUCTS'
  | 'PRODUCT_PRICING'
  | 'PRODUCT_PRICINGS'
  | 'VENDOR_OFFER'
  | 'PURCHASE_FILE'
  | 'PURCHASE_FILE_NUMBER'
  | 'VAT_INCLUDED'
  | 'QUOTE_DATE'
  | 'QUOTE_NUMBER'
  | 'TOTAL_EXCL_TAX'
  | 'CONSULTED_AT'
  | 'NET_PRICE_EXCL_TAX'
  | 'TAX_INCLUDED'
  | 'RECEIPT_NUMBER'
  | 'RECEIVED_AT'
  | 'PRICING'
  | 'PURCHASE_ORDER_ATTACHMENTS'
  | 'PURCHASE_ORDER_ATTACHMENT'
  | 'SECONDARY_PHONE_NUMBER'
  | 'ADDRESSES'
  | 'SUB_PRODUCTS'
  | 'BUDGET_AMOUNT'
  | 'COMPONENTS'
  | 'PAYMENT_MODALITY'
  | 'PURCHASE_ORDER_ALLOWED'
  | 'REST_QUANTITY'
  | 'TOTAL_DISCOUNT'
  | 'INVOICE_NUMBER'
  | 'INVOICE'
  | 'INVOICES'
  | 'DESIRED_PRODUCT_QUANTITY'
  | 'SECTION'
  | 'SECTIONS'
  | 'VALIDATION_STATUS'
  | 'VALIDATED_BY'
  | 'VALIDATED_AT'
  | 'PENDING'
  | 'PURCHASE_ORDER_PRODUCT_COMPONENT'
  | 'RECEIPT_ORDER_PRODUCT_COMPONENT'
  | 'RECEIVED'
  | 'CONSTRUCTION_START_AT'
  | 'CONSTRUCTION_END_AT'
  | 'CITY'
  | 'TAX_ID'
  | 'FLOOR'
  | 'CLINIC_STATUS'
  | 'BLOC'
  | 'BLOCS'
  | 'V_A_T_INCLUDED'
  | 'PRODUCT_SECTION'
  | 'OPERATION_TYPE'
  | 'IS_MENU_ITEM'
  | 'SUFFIX'
  | 'RESOURCE'
type I18nLanguage = Record<I18nMessageKey, string>

const I18N_MESSAGES: Record<Lang, I18nLanguage> = {ar, en, fr};

export type {I18nMessageKey, Lang, I18nLanguage};
export {I18N_MESSAGES};