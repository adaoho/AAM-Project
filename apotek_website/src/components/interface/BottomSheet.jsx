import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setModalBottom } from "../../features/component/componentSlice";
import { motion, AnimatePresence } from "framer-motion";

const BottomSheet = ({ title, children, height, onCloseCondition }) => {
  const { modalBottom } = useSelector((state) => state.component);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {modalBottom && (
        <>
          <motion.div
            className="inset-0 bg-black/50 z-40 h-screen w-screen fixed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              dispatch(setModalBottom(false));
              onCloseCondition();
            }}
          ></motion.div>
          <div className="inset-0 flex items-start justify-center absolute">
            <motion.div
              className={`fixed md:w-[520px] bg-white w-full bottom-0 rounded-t-xl p-5 z-50 + ${height}`}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-y-2">
                {title && (
                  <div className="flex justify-between items-center border-b-[1px] pb-2">
                    <h1 className="font-bold truncate-singleline">{title}</h1>
                    <CgClose
                      className="text-[18px]"
                      onClick={() => {
                        dispatch(setModalBottom(false));
                        onCloseCondition();
                      }}
                    />
                  </div>
                )}
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
