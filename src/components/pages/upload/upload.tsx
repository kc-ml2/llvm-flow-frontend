import React, { useEffect, useState } from "react";
// import uploadAPI from '@/api/http-upload'
// import getCompilerOutput from '@/api/http-upload'
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setGraphData } from "@/redux/features/graph/graphSlice";
import styles from "./upload.module.scss";
import buttons from "../../../Button.module.scss";
const { REACT_APP_API_URL } = process.env;

function Upload() {
  const { isLogin, token } = useAppSelector((state) => state.auth);
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const content = e.target[0].files;
    const transformpass = e.target[1].value;

    const data = new FormData();
    for (let i = 0; i < content.length; i++) {
      data.append("content", content[i]);
    }
    data.append("transformpass", transformpass);

    // for (const value of data.entries()) {
    //   console.log(value)
    // }

    // const response = await getCompilerOutput({ data, token })

    const headers = {
      Authorization: "Token " + token,
      // FIXME: boundary 해결하기!
      "Content-type":
        "multipart/form-data; boundary=177130003042384797933296855923",
    };

    axios
      .post(`${REACT_APP_API_URL}:8000/upload/`, data, { headers: headers })
      .then((response) => {
        dispatch(setGraphData(response.data));
        navigate("/llvmcfg");
      });
  };

  return (
    <section className={styles.upload}>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className={styles.file}>
          <label htmlFor="input-file">File Upload</label>
          <input
            type="file"
            name="content"
            multiple
            id="intput-file"
            accept=".c, .h"
          />
        </div>
        <div className={styles.pass}>
          <label htmlFor="input-text">Pass Option</label>
          <input
            type="text"
            name="transformpass"
            id="input-text"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className={styles.cmd}>
          <h5>clang 10, llvm 10</h5>
          <p>
            opt beforeg.ll -S <i>-{pass}</i> -o afterg.ll
          </p>
        </div>
        <div id={styles.submit}>
          <input
            type="submit"
            value="submit"
            className={buttons.default}
          ></input>
        </div>
      </form>
    </section>
  );
}

export default Upload as React.ComponentType;
