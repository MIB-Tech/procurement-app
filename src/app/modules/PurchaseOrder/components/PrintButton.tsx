import React, { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModelEnum } from "../../types";
import { HydraItem } from "../../../../_core/types/hydra.types";
import { Button } from "../../../../_core/components/Button";
import { Trans } from "../../../../_core/components/Trans";
import { TableView } from "../../../../_core/ListingView/views/Table/TableView";
import { Checkbox } from "../../../../_core/Column/Boolean/Chechbox/Checkbox";

export const PrintButton: FC<{
  selectedItems: Array<HydraItem<ModelEnum.PurchaseOrderProduct>>;
}> = ({ selectedItems }) => {
  const [open, setOpen] = useState<boolean>();
  const [checkedItems, setCheckedItems] = useState<
    Array<HydraItem<ModelEnum.DesiredProduct>>
  >([]);

  const receiptProducts = selectedItems.reduce(
    (receiptProducts, purchaseOrderProduct) => [
      ...receiptProducts,
      ...(purchaseOrderProduct.desiredProducts as Array<
        HydraItem<ModelEnum.DesiredProduct>
      >),
    ],
    [] as Array<HydraItem<ModelEnum.DesiredProduct>>
  );

  return (
    <div>
      <div className='position-relative'>
        <Button
          size='sm'
          variant='outline-default'
          className='bg-white'
          disabled={selectedItems.length === 0}
          onClick={() => setOpen(true)}
        >
          <Trans id='GENERATE_RECEIPT' />
        </Button>
        {selectedItems.length > 0 && (
          <div
            className='position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle badge-primary'
            style={{ zIndex: 100 }}
          >
            {selectedItems.length}
          </div>
        )}
      </div>
      {open && (
        <Modal
          size='lg'
          show
          onHide={() => {
            setOpen(false);
          }}
        >
          <Modal.Header>
            <Modal.Title>
              <Trans id='GENERATE_RECEIPT' />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='scroll-y max-h-600px'>
            <TableView
              data={receiptProducts}
              modelName={ModelEnum.DesiredProduct}
              columns={{
                address: true,
                quantity: true,
                status: true,
              }}
              renderAction={({ item }) => {
                const checked = checkedItems.some(
                  (checkedItem) => checkedItem.id === item.id
                );

                return (
                  <Checkbox
                    checked={checked}
                    disabled={!!item.receiptProduct}
                    onChange={(e) => {
                      setCheckedItems(
                        checked
                          ? checkedItems.filter(
                              (checkedItem) => checkedItem.id !== item.id
                            )
                          : [...checkedItems, item]
                      );
                    }}
                  />
                );
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='light'
              onClick={() => setOpen(false)}
            >
              <Trans id='CANCEL' />
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                // todo mutate
              }}
            >
              <Trans id='GENERATE' />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
